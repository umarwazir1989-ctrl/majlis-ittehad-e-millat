import Link from "next/link";
import {siteDetails} from "../../../data/site";

function Status({ok}:{ok:boolean}){return <span className={ok?"launchOk":"launchPending"}>{ok?"مکمل":"باقی"}</span>}

export default function LaunchPage(){
  const checks=[
    ["Supabase URL",Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)],
    ["Supabase Public Key",Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)],
    ["Production Site URL",Boolean(process.env.NEXT_PUBLIC_SITE_URL)],
    ["اصل فون نمبر",Boolean(siteDetails.contact.phone)],
    ["اصل ای میل",Boolean(siteDetails.contact.email)],
    ["دفتر کا پتہ",Boolean(siteDetails.contact.office)],
    ["Email Notifications",Boolean(process.env.RESEND_API_KEY&&process.env.EMAIL_FROM&&process.env.ADMIN_NOTIFICATION_EMAIL)]
  ];

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap"><Link href="/admin">ڈیش بورڈ ←</Link><h1>Launch Readiness</h1></div></section>
    <section className="section"><div className="wrap">
      <div className="launchPanel">
        <div className="launchPanelHead"><div><span className="eyebrow">Phase 12</span><h2>حتمی لانچ چیک لسٹ</h2></div><img src="/brand/majlis-logo.svg" alt=""/></div>
        <div className="launchChecks">
          {checks.map(([name,ok])=><div className="launchCheck" key={String(name)}><b>{name}</b><Status ok={Boolean(ok)}/></div>)}
        </div>
        <div className="adminAlert">خالی رابطہ معلومات جان بوجھ کر فرضی values سے نہیں بھری گئیں۔ اصل معلومات ملنے پر صرف <code>data/site.ts</code> میں درج کریں۔</div>
      </div>
    </div></section>
  </main>
}
