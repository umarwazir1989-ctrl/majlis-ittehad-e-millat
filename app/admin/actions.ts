"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "../../lib/supabase/server";

async function requireAdmin(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect("/admin/login");
  const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).single();
  if(!profile||profile.role!=="admin") throw new Error("Unauthorized");
  return supabase;
}
const str=(fd:FormData,key:string)=>String(fd.get(key)||"").trim();

export async function logout(){
  const s=await createClient(); await s.auth.signOut(); redirect("/admin/login");
}

export async function createArticle(fd:FormData){
  const s=await requireAdmin();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),category:str(fd,"category"),
    author:str(fd,"author")||"مجلس اتحادِ ملت",excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),status:str(fd,"status")||"draft",image_url:str(fd,"image_url")||null};
  const {error}=await s.from("articles").insert(payload); if(error) throw new Error(error.message);
  revalidatePath("/articles"); revalidatePath("/admin/articles"); redirect("/admin/articles");
}
export async function updateArticle(id:string,fd:FormData){
  const s=await requireAdmin();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),category:str(fd,"category"),
    author:str(fd,"author"),excerpt:str(fd,"excerpt"),content:str(fd,"content"),
    status:str(fd,"status"),image_url:str(fd,"image_url")||null,updated_at:new Date().toISOString()};
  const {error}=await s.from("articles").update(payload).eq("id",id); if(error) throw new Error(error.message);
  revalidatePath("/articles"); revalidatePath("/admin/articles"); redirect("/admin/articles");
}
export async function deleteArticle(id:string){
  const s=await requireAdmin(); const {error}=await s.from("articles").delete().eq("id",id);
  if(error) throw new Error(error.message); revalidatePath("/articles"); revalidatePath("/admin/articles");
}

export async function createActivity(fd:FormData){
  const s=await requireAdmin();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),type:str(fd,"type"),
    event_date:str(fd,"event_date")||null,location:str(fd,"location"),excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),status:str(fd,"status")||"draft",image_url:str(fd,"image_url")||null};
  const {error}=await s.from("activities").insert(payload); if(error) throw new Error(error.message);
  revalidatePath("/activities"); revalidatePath("/admin/activities"); redirect("/admin/activities");
}
export async function updateActivity(id:string,fd:FormData){
  const s=await requireAdmin();
  const payload={title:str(fd,"title"),slug:str(fd,"slug"),type:str(fd,"type"),
    event_date:str(fd,"event_date")||null,location:str(fd,"location"),excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),status:str(fd,"status"),image_url:str(fd,"image_url")||null,
    updated_at:new Date().toISOString()};
  const {error}=await s.from("activities").update(payload).eq("id",id); if(error) throw new Error(error.message);
  revalidatePath("/activities"); revalidatePath("/admin/activities"); redirect("/admin/activities");
}
export async function deleteActivity(id:string){
  const s=await requireAdmin(); const {error}=await s.from("activities").delete().eq("id",id);
  if(error) throw new Error(error.message); revalidatePath("/activities"); revalidatePath("/admin/activities");
}

export async function createPerson(fd:FormData){
  const s=await requireAdmin();
  const payload={name:str(fd,"name"),slug:str(fd,"slug"),council:str(fd,"council"),
    designation:str(fd,"designation"),summary:str(fd,"summary"),bio:str(fd,"bio"),
    image_url:str(fd,"image_url")||null};
  const {error}=await s.from("people").insert(payload); if(error) throw new Error(error.message);
  revalidatePath("/leadership"); revalidatePath("/advisory"); revalidatePath("/admin/people"); redirect("/admin/people");
}
export async function updatePerson(id:string,fd:FormData){
  const s=await requireAdmin();
  const payload={name:str(fd,"name"),slug:str(fd,"slug"),council:str(fd,"council"),
    designation:str(fd,"designation"),summary:str(fd,"summary"),bio:str(fd,"bio"),
    image_url:str(fd,"image_url")||null};
  const {error}=await s.from("people").update(payload).eq("id",id); if(error) throw new Error(error.message);
  revalidatePath("/leadership"); revalidatePath("/advisory"); revalidatePath("/admin/people"); redirect("/admin/people");
}
export async function deletePerson(id:string){
  const s=await requireAdmin(); const {error}=await s.from("people").delete().eq("id",id);
  if(error) throw new Error(error.message); revalidatePath("/leadership"); revalidatePath("/advisory"); revalidatePath("/admin/people");
}
