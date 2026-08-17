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

export async function logout(){
  const supabase=await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createArticle(formData:FormData){
  const supabase=await requireAdmin();
  const payload={
    title:String(formData.get("title")||"").trim(),
    slug:String(formData.get("slug")||"").trim(),
    category:String(formData.get("category")||"").trim(),
    author:String(formData.get("author")||"مجلس اتحادِ ملت").trim(),
    excerpt:String(formData.get("excerpt")||"").trim(),
    content:String(formData.get("content")||"").trim(),
    status:String(formData.get("status")||"draft")
  };
  const {error}=await supabase.from("articles").insert(payload);
  if(error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id:string){
  const supabase=await requireAdmin();
  const {error}=await supabase.from("articles").delete().eq("id",id);
  if(error) throw new Error(error.message);
  revalidatePath("/admin/articles"); revalidatePath("/articles");
}

export async function createActivity(formData:FormData){
  const supabase=await requireAdmin();
  const payload={
    title:String(formData.get("title")||"").trim(),
    slug:String(formData.get("slug")||"").trim(),
    type:String(formData.get("type")||"").trim(),
    event_date:String(formData.get("event_date")||"").trim()||null,
    location:String(formData.get("location")||"").trim(),
    excerpt:String(formData.get("excerpt")||"").trim(),
    content:String(formData.get("content")||"").trim(),
    status:String(formData.get("status")||"draft")
  };
  const {error}=await supabase.from("activities").insert(payload);
  if(error) throw new Error(error.message);
  revalidatePath("/admin/activities"); revalidatePath("/activities");
  redirect("/admin/activities");
}

export async function deleteActivity(id:string){
  const supabase=await requireAdmin();
  const {error}=await supabase.from("activities").delete().eq("id",id);
  if(error) throw new Error(error.message);
  revalidatePath("/admin/activities"); revalidatePath("/activities");
}
