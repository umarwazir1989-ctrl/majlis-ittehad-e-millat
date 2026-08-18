"use server";
import {revalidatePath} from "next/cache";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";

export async function markNotificationRead(id:string){
  await requireAdminOnly();
  const s=await createClient();
  const {error}=await s.from("admin_notifications").update({is_read:true}).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/admin/notifications");
}

export async function markAllNotificationsRead(){
  await requireAdminOnly();
  const s=await createClient();
  const {error}=await s.from("admin_notifications").update({is_read:true}).eq("is_read",false);
  if(error)throw new Error(error.message);
  revalidatePath("/admin/notifications");
}

export async function deleteNotification(id:string){
  await requireAdminOnly();
  const s=await createClient();
  const {error}=await s.from("admin_notifications").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/admin/notifications");
}
