import Link from "next/link";
import {createClient,isSupabaseConfigured} from "../../lib/supabase/server";
import {logout} from "./actions";

export default async function AdminPage(){
  if(!isSupabaseConfigured()) return <main className="adminPage"><section className="adminHero"><div className="wrap"><h1>انتظامی ڈیش بورڈ</h1><p>Supabase configure کرنے کے بعد حقیقی dashboard فعال ہوگا۔</p></div></section></main>;
  const supabase=await createClient();
  const [{count:articleCount},{count:activityCount},{count:peopleCount}]=await Promise.all([
    supabase.from("articles").select("*",{count:"exact",head:true}),
    supabase.from("activities").select("*",{count:"exact",head:true}),
    supabase.from("people").select("*",{count:"exact",head:true})
  ]);
  return <main className="adminPage">
    <section className="adminHero"><div className="wrap adminHeroRow"><div><span className="eyebrow">Phase 6</span><h1>انتظامی ڈیش بورڈ</h1><p>اب login، database اور محفوظ admin actions کے ساتھ۔</p></div><form action={logout}><button className="adminLogout">لاگ آؤٹ</button></form></div></section>
    <section className="section"><div className="wrap">
      <div className="adminStats"><div><strong>{articleCount||0}</strong><span>Database مضامین</span></div><div><strong>{activityCount||0}</strong><span>سرگرمیاں</span></div><div><strong>{peopleCount||0}</strong><span>شخصیات</span></div><div><strong>محفوظ</strong><span>Admin Session</span></div></div>
      <div className="adminModules"><Link href="/admin/articles"><b>مضامین</b><span>نیا مضمون، فہرست، حذف ←</span></Link><Link href="/admin/activities"><b>سرگرمیاں</b><span>نئی سرگرمی، فہرست، حذف ←</span></Link><Link href="/admin/people"><b>شخصیات</b><span>Database structure ←</span></Link><Link href="/admin/categories"><b>زمرے</b><span>Category structure ←</span></Link></div>
    </div></section>
  </main>
}
