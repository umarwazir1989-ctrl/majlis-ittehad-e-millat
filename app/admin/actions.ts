"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "../../lib/supabase/server";
import {getAdminContext} from "../../lib/admin/auth";

async function contentAccess(deleteOperation=false){
  const ctx=await getAdminContext();
  if(!ctx?.permissions.manageContent)throw new Error("Unauthorized");
  if(deleteOperation&&!ctx.permissions.deleteContent)throw new Error("Editors cannot delete content.");
  return {ctx,supabase:await createClient()};
}
const str=(fd:FormData,key:string)=>String(fd.get(key)||"").trim();

export async function logout(){
  const s=await createClient();
  await s.auth.signOut();
  redirect("/admin/login");
}

export async function createArticle(fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),category:str(fd,"category"),
    author:str(fd,"author")||"مجلس اتحادِ ملت",excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),status:str(fd,"status")||"draft",image_url:str(fd,"image_url")||null};
  const {error}=await s.from("articles").insert(payload);
  if(error)throw new Error(error.message);
  revalidatePath("/articles");revalidatePath("/admin/articles");redirect("/admin/articles");
}
export async function updateArticle(id:string,fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),category:str(fd,"category"),
    author:str(fd,"author"),excerpt:str(fd,"excerpt"),content:str(fd,"content"),
    status:str(fd,"status"),image_url:str(fd,"image_url")||null,updated_at:new Date().toISOString()};
  const {error}=await s.from("articles").update(payload).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/articles");revalidatePath("/admin/articles");redirect("/admin/articles");
}
export async function deleteArticle(id:string){
  const {supabase:s}=await contentAccess(true);
  const {error}=await s.from("articles").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/articles");revalidatePath("/admin/articles");
}

export async function createActivity(fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),type:str(fd,"type"),
    event_date:str(fd,"event_date")||null,location:str(fd,"location"),excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),status:str(fd,"status")||"draft",image_url:str(fd,"image_url")||null};
  const {error}=await s.from("activities").insert(payload);
  if(error)throw new Error(error.message);
  revalidatePath("/activities");revalidatePath("/admin/activities");redirect("/admin/activities");
}
export async function updateActivity(id:string,fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),type:str(fd,"type"),
    event_date:str(fd,"event_date")||null,location:str(fd,"location"),excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),status:str(fd,"status"),image_url:str(fd,"image_url")||null,
    updated_at:new Date().toISOString()};
  const {error}=await s.from("activities").update(payload).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/activities");revalidatePath("/admin/activities");redirect("/admin/activities");
}
export async function deleteActivity(id:string){
  const {supabase:s}=await contentAccess(true);
  const {error}=await s.from("activities").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/activities");revalidatePath("/admin/activities");
}

export async function createPerson(fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={name:str(fd,"name"),slug:str(fd,"slug"),council:str(fd,"council"),
    designation:str(fd,"designation"),summary:str(fd,"summary"),bio:str(fd,"bio"),
    image_url:str(fd,"image_url")||null};
  const {error}=await s.from("people").insert(payload);
  if(error)throw new Error(error.message);
  revalidatePath("/leadership");revalidatePath("/advisory");revalidatePath("/admin/people");redirect("/admin/people");
}
export async function updatePerson(id:string,fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={name:str(fd,"name"),slug:str(fd,"slug"),council:str(fd,"council"),
    designation:str(fd,"designation"),summary:str(fd,"summary"),bio:str(fd,"bio"),
    image_url:str(fd,"image_url")||null};
  const {error}=await s.from("people").update(payload).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/leadership");revalidatePath("/advisory");revalidatePath("/admin/people");redirect("/admin/people");
}
export async function deletePerson(id:string){
  const {supabase:s}=await contentAccess(true);
  const {error}=await s.from("people").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/leadership");revalidatePath("/advisory");revalidatePath("/admin/people");
}
