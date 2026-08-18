"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "../../../lib/supabase/server";

async function requireAdmin(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)redirect("/admin/login");
  const {data:p}=await s.from("profiles").select("role").eq("id",user.id).single();
  if(p?.role!=="admin")throw new Error("Unauthorized");
  return s;
}

export async function setSubscriberStatus(id:string,status:"active"|"unsubscribed"){
  const s=await requireAdmin();
  const {error}=await s.from("newsletter_subscribers").update({status}).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/admin/subscribers");
}

export async function deleteSubscriber(id:string){
  const s=await requireAdmin();
  const {error}=await s.from("newsletter_subscribers").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/admin/subscribers");
}
