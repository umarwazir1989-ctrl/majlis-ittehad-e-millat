"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "../../lib/supabase/server";

async function admin(){
 const s=await createClient();const {data:{user}}=await s.auth.getUser();if(!user)redirect("/admin/login");
 const {data:p}=await s.from("profiles").select("role").eq("id",user.id).single();if(p?.role!=="admin")throw new Error("Unauthorized");return s;
}
export async function updateMembershipStatus(id:string,status:string){
 if(!["new","reviewed","approved","rejected"].includes(status))throw new Error("Invalid status");
 const s=await admin();const {error}=await s.from("membership_applications").update({status}).eq("id",id);if(error)throw new Error(error.message);revalidatePath("/admin/memberships");
}
export async function deleteMembership(id:string){const s=await admin();const {error}=await s.from("membership_applications").delete().eq("id",id);if(error)throw new Error(error.message);revalidatePath("/admin/memberships")}
export async function updateMessageStatus(id:string,status:string){
 if(!["new","read","replied","closed"].includes(status))throw new Error("Invalid status");
 const s=await admin();const {error}=await s.from("contact_messages").update({status}).eq("id",id);if(error)throw new Error(error.message);revalidatePath("/admin/messages");
}
export async function deleteMessage(id:string){const s=await admin();const {error}=await s.from("contact_messages").delete().eq("id",id);if(error)throw new Error(error.message);revalidatePath("/admin/messages")}
