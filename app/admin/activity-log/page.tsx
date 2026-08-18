import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";

export default async function ActivityLogPage(){
  await requireAdminOnly();
  const s=await createClient();
  const {data,error}=await s.from("audit_logs")
    .select("id,action,entity_type,entity_id,details,created_at,profiles(full_name)")
    .order("created_at",{ascending:false})
    .limit(200);

  if(error)throw new Error(error.message);

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <span className="eyebrow">Audit Trail</span>
      <h1>Activity Log</h1>
      <p>اہم content اور انتظامی تبدیلیوں کا تازہ ریکارڈ۔</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="auditTimelineV17">
        {(data||[]).length?(data||[]).map((x:any)=><article key={x.id}>
          <div className="auditDotV17"></div>
          <div className="auditBodyV17">
            <div className="auditTitleV17">
              <b>{x.action}</b>
              <span>{x.entity_type}{x.entity_id?` • ${x.entity_id}`:""}</span>
            </div>
            <p>{x.details&&Object.keys(x.details).length?JSON.stringify(x.details):"تفصیلی metadata موجود نہیں۔"}</p>
            <small>{x.profiles?.full_name||"System"} • {new Date(x.created_at).toLocaleString("ur-PK")}</small>
          </div>
        </article>):<div className="emptyState"><b>ابھی activity log خالی ہے</b></div>}
      </div>
    </div></section>
  </main>
}
