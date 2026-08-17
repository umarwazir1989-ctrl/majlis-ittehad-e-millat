"use server";
import {redirect} from "next/navigation";
import {createClient,isSupabaseConfigured} from "../../lib/supabase/server";
import {notifyAdmin,sendEmail,isEmailConfigured} from "../../lib/email/notify";
const s=(fd:FormData,k:string)=>String(fd.get(k)||"").trim();

export async function submitMessage(fd:FormData){
  if(s(fd,"website"))redirect("/contact?success=1");
  const name=s(fd,"name"),email=s(fd,"email"),phone=s(fd,"phone"),subject=s(fd,"subject"),message=s(fd,"message");
  if(name.length<2||!email.includes("@")||subject.length<3||message.length<10)redirect("/contact?error=validation");
  if(!isSupabaseConfigured())redirect("/contact?error=config");
  const supabase=await createClient();
  const {error}=await supabase.from("contact_messages").insert({name,email,phone:phone||null,subject,message});
  if(error)redirect("/contact?error=submit");

  await notifyAdmin(`نیا رابطہ پیغام: ${subject}`,`<h2>${subject}</h2><p><b>نام:</b> ${name}</p><p><b>ای میل:</b> ${email}</p><p>${message}</p>`);
  if(isEmailConfigured())await sendEmail({to:email,subject:"آپ کا پیغام موصول ہوگیا",html:`<p>محترم ${name}،</p><p>آپ کا پیغام مجلس اتحادِ ملت کو موصول ہوگیا ہے۔ شکریہ۔</p>`});
  redirect("/contact?success=1");
}
