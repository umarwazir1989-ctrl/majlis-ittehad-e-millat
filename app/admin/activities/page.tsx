import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {getAdminContext} from "../../../lib/admin/auth";
import {deleteActivity} from "../actions";

function StatusBadge({status}:{status:string}){
  return <span className={`workflowBadgeV18 ${status}`}>{status}</span>;
}

export default async function Page(){
  const ctx=await getAdminContext();
  const s=await createClient();
  const {data,error}=await s.from("activities").select("*").order("created_at",{ascending:false});
  if(error)throw new Error(error.message);

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap adminSubRow">
      <div><Link href="/admin">ڈیش بورڈ ←</Link><h1>سرگرمیوں کا انتظام</h1></div>
      <Link className="adminAdd" href="/admin/activities/new">+ نئی سرگرمی</Link>
    </div></section>
    <section className="section"><div className="wrap adminTable">
      {data?.length?data.map(a=><div className="adminRow workflowRowV18" key={a.id}>
        <div>
          <b>{a.title}</b>
          <span>{a.type}</span>
          <div className="workflowMetaV18">
            <StatusBadge status={a.status}/>
            {a.scheduled_for&&<small>{new Date(a.scheduled_for).toLocaleString("ur-PK")}</small>}
          </div>
        </div>
        <div className="adminRowActions">
          <Link href={`/activities/${a.slug}`}>دیکھیں</Link>
          <Link href={`/admin/activities/${a.id}/edit`}>ترمیم</Link>
          {ctx?.permissions.deleteContent&&<form action={deleteActivity.bind(null,a.id)}><button>حذف</button></form>}
        </div>
      </div>):<div className="emptyState"><b>کوئی سرگرمی موجود نہیں</b></div>}
    </div></section>
  </main>
}
