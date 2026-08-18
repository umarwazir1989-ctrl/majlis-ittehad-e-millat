"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "../../../lib/supabase/server";

async function requireAdmin(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/admin/login");
  const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).single();
  if(profile?.role!=="admin")throw new Error("Unauthorized");
  return supabase;
}
const v=(fd:FormData,key:string)=>String(fd.get(key)||"").trim();

export async function saveSiteSettings(fd:FormData){
  const supabase=await requireAdmin();
  const icons=["shield","unity","book","dialogue","people"];
  const pillars=Array.from({length:5},(_,i)=>({
    icon:v(fd,`pillar_icon_${i}`)||icons[i],
    title:v(fd,`pillar_title_${i}`),
    text:v(fd,`pillar_text_${i}`)
  }));

  const value={
    brand:{name:v(fd,"brand_name"),tagline:v(fd,"brand_tagline"),description:v(fd,"brand_description")},
    contact:{phone:v(fd,"contact_phone"),email:v(fd,"contact_email"),office:v(fd,"contact_office"),whatsapp:v(fd,"contact_whatsapp")},
    social:{facebook:v(fd,"social_facebook"),youtube:v(fd,"social_youtube"),x:v(fd,"social_x"),instagram:v(fd,"social_instagram")},
    footer:{newsletter_title:v(fd,"footer_newsletter_title"),newsletter_text:v(fd,"footer_newsletter_text"),copyright:v(fd,"footer_copyright")},
    home:{
      kicker:v(fd,"home_kicker"),title:v(fd,"home_title"),description:v(fd,"home_description"),
      primary_label:v(fd,"home_primary_label"),primary_url:v(fd,"home_primary_url"),
      secondary_label:v(fd,"home_secondary_label"),secondary_url:v(fd,"home_secondary_url"),
      message_title:v(fd,"home_message_title"),message_text:v(fd,"home_message_text"),
      verse_text:v(fd,"home_verse_text"),verse_reference:v(fd,"home_verse_reference"),
      about_eyebrow:v(fd,"home_about_eyebrow"),about_title:v(fd,"home_about_title"),about_description:v(fd,"home_about_description"),
      forums_title:v(fd,"home_forums_title"),
      elders_eyebrow:v(fd,"home_elders_eyebrow"),elders_title:v(fd,"home_elders_title"),elders_description:v(fd,"home_elders_description"),
      advisory_eyebrow:v(fd,"home_advisory_eyebrow"),advisory_title:v(fd,"home_advisory_title"),advisory_description:v(fd,"home_advisory_description"),
      pillars
    }
  };

  const {error}=await supabase.from("site_settings").upsert(
    {setting_key:"main",value,updated_at:new Date().toISOString()},
    {onConflict:"setting_key"}
  );
  if(error)throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
