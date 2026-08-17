import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {siteDetails} from "../../../data/site";

function Status({ok}:{ok:boolean}){return <span className={ok?"auditOk":"auditPending"}>{ok?"مکمل":"باقی"}</span>}

export default async function ContentAuditPage(){
  const s=await createClient();

  const [{data:people},{data:articles},{data:activities}]=await Promise.all([
    s.from("people").select("id,name,council,designation,summary,bio,image_url,verified"),
    s.from("articles").select("id,title,status,image_url,verified,excerpt,content"),
    s.from("activities").select("id,title,status,image_url,verified,excerpt,content,location,event_date")
  ]);

  const peopleRows=people||[];
  const articleRows=articles||[];
  const activityRows=activities||[];

  const peopleComplete=peopleRows.filter(x=>x.image_url&&x.bio&&x.summary&&x.designation).length;
  const articlesPublished=articleRows.filter(x=>x.status==="published").length;
  const articlesVerified=articleRows.filter(x=>x.status==="published"&&x.verified).length;
  const activitiesPublished=activityRows.filter(x=>x.status==="published").length;
  const activitiesVerified=activityRows.filter(x=>x.status==="published"&&x.verified).length;

  const contactReady=Boolean(siteDetails.contact.phone&&siteDetails.contact.email&&siteDetails.contact.office);

  const checks=[
    ["اصل فون، ای میل اور دفتر",contactReady],
    ["تمام شخصیات کی تصویر + بایو",peopleRows.length>0&&peopleComplete===peopleRows.length],
    ["کم از کم ایک verified مضمون",articlesVerified>0],
    ["کم از کم ایک verified سرگرمی",activitiesVerified>0],
    ["Production Content Mode",process.env.NEXT_PUBLIC_CONTENT_MODE==="production"],
    ["Production Site URL",Boolean(process.env.NEXT_PUBLIC_SITE_URL)]
  ];

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <h1>Final Content Audit</h1>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="auditStats">
        <div><strong>{peopleComplete}/{peopleRows.length}</strong><span>مکمل شخصیات</span></div>
        <div><strong>{articlesVerified}/{articlesPublished}</strong><span>Verified مضامین</span></div>
        <div><strong>{activitiesVerified}/{activitiesPublished}</strong><span>Verified سرگرمیاں</span></div>
      </div>

      <div className="auditPanel">
        <div className="auditHead">
          <div><span className="eyebrow">Phase 14</span><h2>Production Readiness</h2></div>
          <Link href="/admin/migration">Migration Status ↗</Link>
        </div>
        <div className="auditChecks">
          {checks.map(([label,ok])=><div className="auditCheck" key={String(label)}><b>{label}</b><Status ok={Boolean(ok)}/></div>)}
        </div>
      </div>

      <div className="sourceIntegrityNote">
        Production mode فعال کرنے کے بعد dummy fallback public website پر نہیں دکھایا جائے گا۔ اس لیے پہلے اصل مواد داخل اور verify کرنا ضروری ہے۔
      </div>
    </div></section>
  </main>
}
