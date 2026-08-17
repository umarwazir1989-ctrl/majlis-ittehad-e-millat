import Link from "next/link";import {createClient,isSupabaseConfigured} from "../../lib/supabase/server";import {logout} from "./actions";
export default async function AdminPage(){
 if(!isSupabaseConfigured())return <main className="adminPage"><section className="adminHero"><div className="wrap"><h1>انتظامی ڈیش بورڈ</h1><p>Supabase configure کرنے کے بعد dashboard فعال ہوگا۔</p></div></section></main>;
 const s=await createClient();
 const [{count:a},{count:e},{count:p},{count:m},{count:c}]=await Promise.all([
 s.from("articles").select("*",{count:"exact",head:true}),s.from("activities").select("*",{count:"exact",head:true}),
 s.from("people").select("*",{count:"exact",head:true}),s.from("membership_applications").select("*",{count:"exact",head:true}),
 s.from("contact_messages").select("*",{count:"exact",head:true})]);
 return <main className="adminPage"><section className="adminHero"><div className="wrap adminHeroRow"><div><span className="eyebrow">Phase 9</span><h1>انتظامی ڈیش بورڈ</h1><p>مواد، شخصیات، رکنیت کی درخواستیں اور رابطہ پیغامات ایک جگہ۔</p></div><form action={logout}><button className="adminLogout">لاگ آؤٹ</button></form></div></section>
 <section className="section"><div className="wrap"><div className="adminStats phase9Stats"><div><strong>{a||0}</strong><span>مضامین</span></div><div><strong>{e||0}</strong><span>سرگرمیاں</span></div><div><strong>{p||0}</strong><span>شخصیات</span></div><div><strong>{m||0}</strong><span>رکنیت درخواستیں</span></div><div><strong>{c||0}</strong><span>پیغامات</span></div></div>
 <div className="adminModules"><Link href="/admin/articles"><b>مضامین</b><span>تحریری مواد ←</span></Link><Link href="/admin/activities"><b>سرگرمیاں</b><span>پروگرام ←</span></Link><Link href="/admin/people"><b>شخصیات</b><span>مجالس ←</span></Link><Link href="/admin/memberships"><b>رکنیت درخواستیں</b><span>موصولہ فارم ←</span></Link><Link href="/admin/messages"><b>رابطہ پیغامات</b><span>Inbox ←</span></Link></div></div></section></main>
}
