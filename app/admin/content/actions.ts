"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "../../../lib/supabase/server";
import {requireContentEditor} from "../../../lib/admin/auth";

export async function updateSitePage(slug:string,formData:FormData){
  await requireContentEditor();
  const supabase=await createClient();

  const eyebrow=String(formData.get("eyebrow")||"").trim();
  const title=String(formData.get("title")||"").trim();
  const summary=String(formData.get("summary")||"").trim();

  const titles=formData.getAll("section_title").map(x=>String(x).trim());
  const bodies=formData.getAll("section_body").map(x=>String(x).trim());
  const sections=titles.map((title,i)=>({title,body:bodies[i]||""})).filter(x=>x.title||x.body);

  const {error}=await supabase.from("site_pages").upsert({
    slug,eyebrow,title,summary,sections,published:true,updated_at:new Date().toISOString()
  },{onConflict:"slug"});

  if(error)throw new Error(error.message);

  revalidatePath(`/${slug}`);
  revalidatePath("/admin/content");
  redirect("/admin/content?saved=1");
}
