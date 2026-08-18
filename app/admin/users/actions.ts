"use server";
import {revalidatePath} from "next/cache";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";

export async function updateUserProfile(id:string,fd:FormData){
  await requireAdminOnly();
  const full_name=String(fd.get("full_name")||"").trim();
  const role=String(fd.get("role")||"editor").trim();
  if(!["admin","editor"].includes(role))throw new Error("Invalid role");

  const supabase=await createClient();
  const {error}=await supabase.from("profiles").update({full_name,role}).eq("id",id);
  if(error)throw new Error(error.message);

  revalidatePath("/admin/users");
}
