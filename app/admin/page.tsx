import Link from "next/link";
import {createClient,isSupabaseConfigured} from "../../lib/supabase/server";
import {getAdminContext} from "../../lib/admin/auth";
import {logout} from "./actions";

export default async function AdminPage(){
  if(!isSupabaseConfigured())return <main className="adminPage"><section className="adminHero"><div className="wrap"><h1>انتظامی ڈیش بورڈ</h1><p>Supabase configure کرنے کے بعد dashboard فعال ہوگا۔</p></div></section></main>;

  const ctx=await getAdminContext();
  const s=await createClient();

  const [
    {count:a},{count:e},{count:p},
    {count:reviewArticles},{count:reviewActivities}
  ]=await Promise.all([
    s.from("articles").select("*",{count:"exact",head:true}),
    s.from("activities").select("*",{count:"exact",head:true}),
    s.from("people").select("*",{count:"exact",head:true}),
    s.from("articles").select("*",{count:"exact",head:true}).eq("status","review"),
    s.from("activities").select("*",{count:"exact",head:true}).eq("status","review")
  ]);

  const reviewCount=(reviewArticles||0)+(reviewActivities||0);

  let adminCounts:null|{
    memberships:number;messages:number;subscribers:number;notifications:number;scheduled:number;views30:number
  }=null;

  if(ctx?.role==="admin"){
    const since30=new Date(Date.now()-30*24*60*60*1000).toISOString();
    const [m,c,n,notifs,sa,se,views]=await Promise.all([
      s.from("membership_applications").select("*",{count:"exact",head:true}),
      s.from("contact_messages").select("*",{count:"exact",head:true}),
      s.from("newsletter_subscribers").select("*",{count:"exact",head:true}),
      s.from("admin_notifications").select("*",{count:"exact",head:true}).eq("is_read",false),
      s.from("articles").select("*",{count:"exact",head:true}).eq("status","scheduled"),
      s.from("activities").select("*",{count:"exact",head:true}).eq("status","scheduled"),
      s.from("analytics_events").select("*",{count:"exact",head:true}).gte("created_at",since30)
    ]);

    adminCounts={
      memberships:m.count||0,
      messages:c.count||0,
      subscribers:n.count||0,
      notifications:notifs.count||0,
      scheduled:(sa.count||0)+(se.count||0),
      views30:views.count||0
    };
  }

  return <main className="adminPage adminPageV17">
    <section className="adminHero adminHeroV17"><div className="wrap adminHeroRow">
      <div>
        <span className="eyebrow">Phase 18 Editorial Control</span>
        <h1>خوش آمدید، {ctx?.fullName}</h1>
        <p>{ctx?.role==="admin"?"Analytics، editorial review، scheduled publishing اور backup history اب ایک ہی control center میں۔":"مواد Draft میں تیار کریں اور Review کے لیے Admin کو بھیجیں۔"}</p>
      </div>
      <form action={logout}><button className="adminLogout">لاگ آؤٹ</button></form>
    </div></section>

    <section className="section"><div className="wrap">
      <div className={`adminStats ${ctx?.role==="admin"?"phase18Stats":"editorStatsV17"}`}>
        <div><strong>{a||0}</strong><span>مضامین</span></div>
        <div><strong>{e||0}</strong><span>سرگرمیاں</span></div>
        <div><strong>{p||0}</strong><span>شخصیات</span></div>
        <div><strong>{reviewCount}</strong><span>Review Queue</span></div>
        {adminCounts&&<>
          <div><strong>{adminCounts.scheduled}</strong><span>Scheduled</span></div>
          <div><strong>{adminCounts.views30}</strong><span>30d Views</span></div>
        </>}
      </div>

      {adminCounts&&adminCounts.notifications>0&&
        <Link className="notificationBannerV17" href="/admin/notifications">
          <span>●</span><div><b>{adminCounts.notifications} نئی Notifications</b><p>نئی درخواستیں، رابطہ پیغامات یا subscribers دیکھیں۔</p></div><strong>دیکھیں ←</strong>
        </Link>
      }

      {ctx?.role==="admin"&&reviewCount>0&&
        <Link className="reviewBannerV18" href="/admin/review">
          <span>✓</span><div><b>{reviewCount} items Review کے منتظر ہیں</b><p>Approve، schedule یا publish کرنے کے لیے Review Queue کھولیں۔</p></div><strong>Review کریں ←</strong>
        </Link>
      }

      <div className="adminModuleGroupsV17">
        <section>
          <div className="moduleGroupHeadV17"><span>Content</span><h2>علمی و تنظیمی مواد</h2></div>
          <div className="adminModules">
            <Link href="/admin/articles"><b>مضامین</b><span>تحریری مواد ←</span></Link>
            <Link href="/admin/activities"><b>سرگرمیاں</b><span>پروگرام ←</span></Link>
            <Link href="/admin/people"><b>شخصیات</b><span>مجالس ←</span></Link>
            <Link href="/admin/content"><b>بنیادی صفحات</b><span>تعارف و وژن ←</span></Link>
          </div>
        </section>

        {ctx?.role==="admin"&&<>
          <section>
            <div className="moduleGroupHeadV17"><span>Editorial</span><h2>Review اور Publishing</h2></div>
            <div className="adminModules">
              <Link href="/admin/review"><b>Review Queue</b><span>Approve / Reject / Publish ←</span></Link>
              <Link href="/admin/schedule"><b>Publishing Schedule</b><span>Scheduled content ←</span></Link>
              <Link href="/admin/analytics"><b>Analytics</b><span>Page views & engagement ←</span></Link>
              <Link href="/admin/backups"><b>Backup History</b><span>Private snapshots ←</span></Link>
            </div>
          </section>

          <section>
            <div className="moduleGroupHeadV17"><span>Communication</span><h2>درخواستیں اور رابطہ</h2></div>
            <div className="adminModules">
              <Link href="/admin/memberships"><b>رکنیت درخواستیں</b><span>{adminCounts?.memberships||0} records ←</span></Link>
              <Link href="/admin/messages"><b>رابطہ پیغامات</b><span>{adminCounts?.messages||0} messages ←</span></Link>
              <Link href="/admin/subscribers"><b>Newsletter</b><span>{adminCounts?.subscribers||0} subscribers ←</span></Link>
              <Link href="/admin/notifications"><b>Notifications</b><span>Notification Center ←</span></Link>
            </div>
          </section>

          <section>
            <div className="moduleGroupHeadV17"><span>Administration</span><h2>کنٹرول اور نگرانی</h2></div>
            <div className="adminModules">
              <Link href="/admin/settings"><b>ویب سائٹ سیٹنگز</b><span>Homepage / Footer / Social ←</span></Link>
              <Link href="/admin/users"><b>Users & Roles</b><span>Admin / Editor permissions ←</span></Link>
              <Link href="/admin/activity-log"><b>Activity Log</b><span>Audit trail ←</span></Link>
              <Link href="/admin/system"><b>System Health</b><span>Monitoring ←</span></Link>
              <Link href="/admin/device-qa"><b>Device QA</b><span>Responsive previews ←</span></Link>
              <Link href="/admin/content-audit"><b>Content Audit</b><span>Completeness ←</span></Link>
              <Link href="/admin/launch"><b>Launch Audit</b><span>Production checklist ←</span></Link>
            </div>
          </section>
        </>}
      </div>
    </div></section>
  </main>
}
