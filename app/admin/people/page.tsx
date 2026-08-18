import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {getAdminContext} from "../../../lib/admin/auth";
import {deletePerson} from "../actions";

export default async function Page(){
  const ctx=await getAdminContext();
  const s=await createClient();
  const {data,error}=await s.from("people").select("*").order("created_at",{ascending:true});
  if(error)throw new Error(error.message);

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap adminSubRow">
      <div><Link href="/admin">ڈیش بورڈ ←</Link><h1>شخصیات کا انتظام</h1></div>
      <Link className="adminAdd" href="/admin/people/new">+ نئی شخصیت</Link>
    </div></section>
    <section className="section"><div className="wrap adminTable">
      {data?.length?data.map(p=><div className="adminRow" key={p.id}>
        <div className="adminPersonRow">
          {p.image_url?<img src={p.image_url} alt=""/>:<span>{p.name?.slice(0,1)}</span>}
          <div><b>{p.name}</b><small>{p.council} • {p.designation}</small></div>
        </div>
        <div className="adminRowActions">
          <Link href={`/people/${p.slug}`}>پروفائل</Link>
          <Link href={`/admin/people/${p.id}/edit`}>ترمیم</Link>
          {ctx?.permissions.deleteContent&&<form action={deletePerson.bind(null,p.id)}><button>حذف</button></form>}
        </div>
      </div>):<div className="emptyState"><b>کوئی شخصیت موجود نہیں</b></div>}
    </div></section>
  </main>
}
