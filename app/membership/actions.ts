"use server";
import {redirect} from "next/navigation";
import {createClient,isSupabaseConfigured} from "../../lib/supabase/server";
import {notifyAdmin,sendEmail,isEmailConfigured} from "../../lib/email/notify";
const s=(fd:FormData,k:string)=>String(fd.get(k)||"").trim();

export async function submitMembership(fd:FormData){
  if(s(fd,"website")) redirect("/membership?success=1");
  const full_name=s(fd,"full_name"),phone=s(fd,"phone"),email=s(fd,"email"),city=s(fd,"city"),profession=s(fd,"profession"),introduction=s(fd,"introduction");
  if(full_name.length<2||phone.length<7||city.length<2||profession.length<2||introduction.length<5) redirect("/membership?error=validation");
  if(!isSupabaseConfigured())redirect("/membership?error=config");
  const supabase=await createClient();
  const {error}=await supabase.from("membership_applications").insert({full_name,phone,email:email||null,city,profession,introduction});
  if(error)redirect("/membership?error=submit");

  await notifyAdmin("نئی رکنیت کی درخواست — مجلس اتحادِ ملت",
    `<h2>نئی رکنیت کی درخواست</h2><p><b>نام:</b> ${full_name}</p><p><b>فون:</b> ${phone}</p><p><b>شہر:</b> ${city}</p><p><b>شعبہ:</b> ${profession}</p>`);
  if(email&&isEmailConfigured())await sendEmail({to:email,subject:"رکنیت کی درخواست موصول ہوگئی",html:`<p>محترم ${full_name}،</p><p>آپ کی درخواست مجلس اتحادِ ملت کو موصول ہوگئی ہے۔ جائزے کے بعد ضرورت کے مطابق رابطہ کیا جائے گا۔</p>`});
  redirect("/membership?success=1");
}
