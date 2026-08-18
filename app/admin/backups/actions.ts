"use server";

import {revalidatePath} from "next/cache";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";

export async function createBackupSnapshot(){
  const ctx=await requireAdminOnly();
  const s=await createClient();

  const tables=[
    "articles",
    "activities",
    "people",
    "site_pages",
    "site_settings",
    "membership_applications",
    "contact_messages",
    "newsletter_subscribers",
    "profiles",
    "audit_logs"
  ] as const;

  const results=await Promise.all(tables.map(async table=>{
    const {data,error}=await s.from(table).select("*");
    if(error)throw new Error(`${table}: ${error.message}`);
    return [table,data||[]] as const;
  }));

  const data=Object.fromEntries(results);
  const itemCount=results.reduce((sum,[,rows])=>sum+rows.length,0);
  const payload={
    exported_at:new Date().toISOString(),
    version:"phase18",
    project:"majlis-ittehad-e-millat",
    data
  };

  const json=JSON.stringify(payload,null,2);
  const bytes=new TextEncoder().encode(json).byteLength;
  const date=new Date();
  const path=`${date.getUTCFullYear()}/${date.toISOString().replace(/[:.]/g,"-")}-backup.json`;

  const {error:uploadError}=await s.storage.from("backups").upload(
    path,
    new Blob([json],{type:"application/json"}),
    {contentType:"application/json",upsert:false}
  );

  if(uploadError)throw new Error(uploadError.message);

  const {error:logError}=await s.from("backup_runs").insert({
    created_by:ctx.userId,
    storage_path:path,
    item_count:itemCount,
    size_bytes:bytes,
    status:"completed"
  });

  if(logError)throw new Error(logError.message);

  revalidatePath("/admin/backups");
}

export async function deleteBackup(id:string,path:string){
  await requireAdminOnly();
  const s=await createClient();

  const {error:storageError}=await s.storage.from("backups").remove([path]);
  if(storageError)throw new Error(storageError.message);

  const {error}=await s.from("backup_runs").delete().eq("id",id);
  if(error)throw new Error(error.message);

  revalidatePath("/admin/backups");
}
