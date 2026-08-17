import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {deleteActivity} from "../actions";
export default async function Page(){
 const s=await createClient(); const {data,error}=await s.from("activities").select("*").order("created_at",{ascending:false}); if(error) throw new Error(error.message);
 return <main className="adminPage"><section className="adminSubHero"><div className="wrap adminSubRow">
 <div><Link href="/admin">ڈیش بورڈ ←</Link><h1>سرگرمیوں کا انتظام</h1></div><Link className="adminAdd" href="/admin/activities/new">+ نئی سرگرمی</Link>
 </div></section><section className="section"><div className="wrap adminTable">
 {data?.length?data.map(a=><div className="adminRow" key={a.id}><div><b>{a.title}</b><span>{a.type} • {a.status}</span></div>
 <div className="adminRowActions"><Link href={`/activities/${a.slug}`}>دیکھیں</Link><Link href={`/admin/activities/${a.id}/edit`}>ترمیم</Link><form action={deleteActivity.bind(null,a.id)}><button>حذف</button></form></div></div>):<div className="emptyState"><b>کوئی سرگرمی موجود نہیں</b></div>}
 </div></section></main>
}
