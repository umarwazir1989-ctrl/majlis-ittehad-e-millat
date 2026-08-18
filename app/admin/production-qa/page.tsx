import Link from "next/link";
import {createClient,isSupabaseConfigured} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";
import {getSiteSettings} from "../../../lib/content/settings";

type Check={
  label:string;
  detail:string;
  state:"pass"|"warn"|"fail";
  value?:string;
};

function status(state:Check["state"]){
  return state==="pass"?"✓":state==="warn"?"!":"×";
}

export default async function ProductionQAPage(){
  await requireAdminOnly();

  const configured=isSupabaseConfigured();
  const settings=await getSiteSettings();
  const s=await createClient();

  const nowIso=new Date().toISOString();
  const sevenDaysAgo=new Date(Date.now()-7*24*60*60*1000).toISOString();

  const [
    publishedArticles,
    publishedActivities,
    people,
    reviewArticles,
    reviewActivities,
    overdueArticles,
    overdueActivities,
    latestBackup,
    analytics7d
  ]=await Promise.all([
    s.from("articles").select("*",{count:"exact",head:true}).eq("status","published"),
    s.from("activities").select("*",{count:"exact",head:true}).eq("status","published"),
    s.from("people").select("*",{count:"exact",head:true}),
    s.from("articles").select("*",{count:"exact",head:true}).eq("status","review"),
    s.from("activities").select("*",{count:"exact",head:true}).eq("status","review"),
    s.from("articles").select("*",{count:"exact",head:true}).eq("status","scheduled").lte("scheduled_for",nowIso),
    s.from("activities").select("*",{count:"exact",head:true}).eq("status","scheduled").lte("scheduled_for",nowIso),
    s.from("backup_runs").select("created_at,status").order("created_at",{ascending:false}).limit(1).maybeSingle(),
    s.from("analytics_events").select("*",{count:"exact",head:true}).gte("created_at",sevenDaysAgo)
  ]);

  const envChecks:Check[]=[
    {
      label:"Supabase Configuration",
      detail:"Production Supabase URL اور public key موجود ہوں۔",
      state:configured?"pass":"fail",
      value:configured?"Configured":"Missing"
    },
    {
      label:"Production Site URL",
      detail:"NEXT_PUBLIC_SITE_URL production domain کی طرف اشارہ کرے۔",
      state:process.env.NEXT_PUBLIC_SITE_URL?"pass":"fail",
      value:process.env.NEXT_PUBLIC_SITE_URL||"Missing"
    },
    {
      label:"Production Content Mode",
      detail:"Dummy fallback روکنے کے لیے NEXT_PUBLIC_CONTENT_MODE=production ہونا چاہیے۔",
      state:process.env.NEXT_PUBLIC_CONTENT_MODE==="production"?"pass":"warn",
      value:process.env.NEXT_PUBLIC_CONTENT_MODE||"Not set"
    },
    {
      label:"Email Notifications",
      detail:"Resend/admin email configuration موجود ہو تو system notifications مکمل ہیں۔",
      state:process.env.RESEND_API_KEY&&process.env.EMAIL_FROM&&process.env.ADMIN_NOTIFICATION_EMAIL?"pass":"warn",
      value:process.env.RESEND_API_KEY?"Configured":"Optional / Missing"
    }
  ];

  const contactChecks:Check[]=[
    {
      label:"Official Email",
      detail:"Public contact اور footer کے لیے درست ادارہ جاتی email۔",
      state:settings.contact.email.includes("@")?"pass":"fail",
      value:settings.contact.email||"Missing"
    },
    {
      label:"Contact Number",
      detail:"فون رابطہ نمبر public site settings میں محفوظ ہو۔",
      state:settings.contact.phone.replace(/\D/g,"").length>=10?"pass":"fail",
      value:settings.contact.phone||"Missing"
    },
    {
      label:"WhatsApp",
      detail:"WhatsApp direct-contact نمبر موجود ہو۔",
      state:settings.contact.whatsapp.replace(/\D/g,"").length>=10?"pass":"warn",
      value:settings.contact.whatsapp||"Missing"
    },
    {
      label:"Brand Identity",
      detail:"ادارے کا نام، tagline اور description site settings سے دستیاب ہوں۔",
      state:settings.brand.name&&settings.brand.tagline&&settings.brand.description?"pass":"fail",
      value:settings.brand.name
    }
  ];

  const contentCount=(publishedArticles.count||0)+(publishedActivities.count||0);
  const reviewCount=(reviewArticles.count||0)+(reviewActivities.count||0);
  const overdueCount=(overdueArticles.count||0)+(overdueActivities.count||0);

  const contentChecks:Check[]=[
    {
      label:"Published Content",
      detail:"کم از کم ایک مضمون یا سرگرمی production میں شائع ہو۔",
      state:publishedArticles.error||publishedActivities.error?"fail":contentCount>0?"pass":"warn",
      value:`${contentCount} items`
    },
    {
      label:"Profiles",
      detail:"مجلس بزرگان/مشاورت کی شخصیات database میں موجود ہوں۔",
      state:people.error?"fail":(people.count||0)>0?"pass":"warn",
      value:`${people.count||0} profiles`
    },
    {
      label:"Review Queue",
      detail:"Launch سے پہلے زیرِ نظر items کا جائزہ مکمل کریں۔",
      state:reviewArticles.error||reviewActivities.error?"fail":reviewCount===0?"pass":"warn",
      value:`${reviewCount} pending`
    },
    {
      label:"Overdue Scheduled Content",
      detail:"ایسا scheduled content نہ ہو جس کا وقت گزر چکا ہو مگر status اب بھی scheduled ہو۔",
      state:overdueArticles.error||overdueActivities.error?"fail":overdueCount===0?"pass":"warn",
      value:`${overdueCount} overdue`
    }
  ];

  let backupState:Check["state"]="warn";
  let backupValue="No backup";
  if(latestBackup.error){
    backupState="fail";
    backupValue="Table unavailable";
  }else if(latestBackup.data?.created_at){
    const age=Date.now()-new Date(latestBackup.data.created_at).getTime();
    backupState=age<=7*24*60*60*1000?"pass":"warn";
    backupValue=new Date(latestBackup.data.created_at).toLocaleString("ur-PK");
  }

  const systemChecks:Check[]=[
    {
      label:"Recent Backup",
      detail:"گزشتہ سات دن میں application-level content snapshot ہونا بہتر ہے۔",
      state:backupState,
      value:backupValue
    },
    {
      label:"Analytics Pipeline",
      detail:"گزشتہ سات دن کے page-view events database میں پڑھنے کے قابل ہوں۔",
      state:analytics7d.error?"fail":"pass",
      value:analytics7d.error?"Unavailable":`${analytics7d.count||0} views`
    },
    {
      label:"Articles Workflow Schema",
      detail:"Phase 18 workflow columns/query قابلِ رسائی ہوں۔",
      state:reviewArticles.error||overdueArticles.error?"fail":"pass",
      value:reviewArticles.error?.message||"Operational"
    },
    {
      label:"Activities Workflow Schema",
      detail:"Phase 18 scheduling/review queries قابلِ رسائی ہوں۔",
      state:reviewActivities.error||overdueActivities.error?"fail":"pass",
      value:reviewActivities.error?.message||"Operational"
    }
  ];

  const categories=[
    ["Environment","Production Configuration",envChecks],
    ["Identity","Contact & Brand",contactChecks],
    ["Content","Publishing Readiness",contentChecks],
    ["System","Operations & Recovery",systemChecks]
  ] as const;

  const all=categories.flatMap(x=>x[2]);
  const passed=all.filter(x=>x.state==="pass").length;
  const failed=all.filter(x=>x.state==="fail").length;
  const score=Math.round((passed/all.length)*100);
  const readiness=failed>0?"اہم مسائل باقی ہیں":score>=85?"Launch کے بہت قریب":"مزید تیاری درکار ہے";

  const manual=[
    "1440px Desktop پر مکمل homepage اور footer چیک کریں",
    "1024px Laptop پر header/menu اور cards چیک کریں",
    "390px Android viewport پر اردو فونٹ اور menu چیک کریں",
    "iPhone Safari پر Nastaliq، buttons اور forms چیک کریں",
    "Membership form submit کرکے Admin inbox میں verify کریں",
    "Contact form submit کرکے notification verify کریں",
    "Editor سے Draft → Review اور Admin سے Publish test کریں",
    "ایک item 5 منٹ آگے Schedule کرکے public visibility verify کریں",
    "Backup بنائیں، download کریں اور JSON کھول کر verify کریں"
  ];

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17 productionQaHeroV19">
      <div className="wrap">
        <Link href="/admin">ڈیش بورڈ ←</Link>
        <span className="eyebrow">Phase 19</span>
        <h1>Production QA & Launch Readiness</h1>
        <p>Launch سے پہلے environment، content، contact details، workflow اور recovery layer کا ایک جگہ جائزہ۔</p>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <div className="productionQaSummaryV19">
          <div className="productionQaScoreV19" style={{"--score":`${score*3.6}deg`} as React.CSSProperties}>
            <strong>{score}%</strong>
            <span>Readiness</span>
          </div>
          <div>
            <span className="eyebrow">Automated Summary</span>
            <h2>{readiness}</h2>
            <p>{passed} checks پاس ہوئے، {failed} critical checks ناکام ہیں۔ Warning items launch سے پہلے review کرنا بہتر ہے۔</p>
          </div>
        </div>

        <div className="qaCategoryGridV19">
          {categories.map(([eyebrow,title,checks])=>
            <section className="qaCategoryV19" key={title}>
              <header><span>{eyebrow}</span><h3>{title}</h3></header>
              <div>
                {checks.map(check=>
                  <div className={`qaCheckV19 ${check.state}`} key={check.label}>
                    <i>{status(check.state)}</i>
                    <div><b>{check.label}</b><p>{check.detail}</p></div>
                    <span>{check.value}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <section className="manualQaV19">
          <h3>حتمی Manual QA Checklist</h3>
          <div className="manualQaGridV19">
            {manual.map((item,i)=><div key={item}><span>{String(i+1).padStart(2,"0")}</span><b>{item}</b></div>)}
          </div>
        </section>
      </div>
    </section>
  </main>
}
