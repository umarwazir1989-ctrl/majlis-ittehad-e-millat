import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {getAdminContext} from "../../../lib/admin/auth";
import {deleteArticle} from "../actions";

export default async function Page(){
  const ctx=await getAdminContext();
  const s=await createClient();
  const {data,error}=await s.from("articles").select("*").order("created_at",{ascending:false});
  if(error)throw new Error(error.message);

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap adminSubRow">
      <div><Link href="/admin">ڈیش بورڈ ←</Link><h1>مضامین کا انتظام</h1></div>
      <Link className="adminAdd" href="/admin/articles/new">+ نیا مضمون</Link>
    </div></section>
    <section className="section"><div className="wrap adminTable">
      {data?.length?data.map(a=><div className="adminRow" key={a.id}>
        <div><b>{a.title}</b><span>{a.category} • {a.status}</span></div>
        <div className="adminRowActions">
          <Link href={`/articles/${a.slug}`}>دیکھیں</Link>
          <Link href={`/admin/articles/${a.id}/edit`}>ترمیم</Link>
          {ctx?.permissions.deleteContent&&<form action={deleteArticle.bind(null,a.id)}><button>حذف</button></form>}
        </div>
      </div>):<div className="emptyState"><b>کوئی مضمون موجود نہیں</b></div>}
    </div></section>
  </main>
}
