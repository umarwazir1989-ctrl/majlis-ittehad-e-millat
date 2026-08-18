import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";

function Badge({ok,label}:{ok:boolean;label?:string}){
  return <span className={ok?"systemOkV17":"systemWarnV17"}>{label||(ok?"OK":"Check")}</span>
}

export default async function SystemPage(){
  await requireAdminOnly();
  const s=await createClient();

  const checks=await Promise.all([
    s.from("articles").select("*",{count:"exact",head:true}),
    s.from("activities").select("*",{count:"exact",head:true}),
    s.from("people").select("*",{count:"exact",head:true}),
    s.from("profiles").select("*",{count:"exact",head:true}),
    s.from("admin_notifications").select("*",{count:"exact",head:true})
  ]);

  const dbOk=checks.every(x=>!x.error);
  const env=[
    ["Supabase URL",Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)],
    ["Supabase Anon Key",Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)],
    ["Production Site URL",Boolean(process.env.NEXT_PUBLIC_SITE_URL)],
    ["Production Content Mode",process.env.NEXT_PUBLIC_CONTENT_MODE==="production"],
    ["Email Notifications",Boolean(process.env.RESEND_API_KEY&&process.env.EMAIL_FROM&&process.env.ADMIN_NOTIFICATION_EMAIL)]
  ];

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <span className="eyebrow">Monitoring</span>
      <h1>System Health</h1>
      <p>Production environment اور database connectivity کا مختصر جائزہ۔</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="systemHeroV17">
        <div><span>Overall Status</span><h2>{dbOk?"Operational":"Attention Required"}</h2><p>Database connectivity اور بنیادی configuration کا موجودہ نتیجہ۔</p></div>
        <Badge ok={dbOk} label={dbOk?"Healthy":"Review"}/>
      </div>

      <div className="systemGridV17">
        <section className="systemPanelV17">
          <h3>Environment</h3>
          {env.map(([name,ok])=><div className="systemCheckV17" key={String(name)}><b>{name}</b><Badge ok={Boolean(ok)}/></div>)}
        </section>

        <section className="systemPanelV17">
          <h3>Database</h3>
          <div className="systemCheckV17"><b>Articles</b><Badge ok={!checks[0].error} label={checks[0].error?"Error":String(checks[0].count||0)}/></div>
          <div className="systemCheckV17"><b>Activities</b><Badge ok={!checks[1].error} label={checks[1].error?"Error":String(checks[1].count||0)}/></div>
          <div className="systemCheckV17"><b>People</b><Badge ok={!checks[2].error} label={checks[2].error?"Error":String(checks[2].count||0)}/></div>
          <div className="systemCheckV17"><b>Staff Profiles</b><Badge ok={!checks[3].error} label={checks[3].error?"Error":String(checks[3].count||0)}/></div>
          <div className="systemCheckV17"><b>Notifications</b><Badge ok={!checks[4].error} label={checks[4].error?"Error":String(checks[4].count||0)}/></div>
        </section>
      </div>

      <div className="systemLinksV17">
        <a href="/api/health" target="_blank">Health API ↗</a>
        <Link href="/admin/content-audit">Content Audit ←</Link>
        <Link href="/admin/launch">Launch Audit ←</Link>
      </div>
    </div></section>
  </main>
}
