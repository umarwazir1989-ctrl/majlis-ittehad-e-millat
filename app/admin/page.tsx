import Link from "next/link";
import {createClient,isSupabaseConfigured} from "../../lib/supabase/server";
import {getAdminContext} from "../../lib/admin/auth";
import {logout} from "./actions";

export default async function AdminPage(){
  if(!isSupabaseConfigured())return <main className="adminPage"><section className="adminHero"><div className="wrap"><h1>انتظامی ڈیش بورڈ</h1><p>Supabase configure کرنے کے بعد dashboard فعال ہوگا۔</p></div></section></main>;

  const ctx=await getAdminContext();
  const s=await createClient();

  const contentCounts=await Promise.all([
    s.from("articles").select("*",{count:"exact",head:true}),
    s.from("activities").select("*",{count:"exact",head:true}),
    s.from("people").select("*",{count:"exact",head:true})
  ]);

  let adminCounts:{memberships:number;messages:number;subscribers:number;notifications:number}|null=null;
  if(ctx?.role==="admin"){
    const [m,c,n,notifs]=await Promise.all([
      s.from("membership_applications").select("*",{count:"exact",head:true}),
      s.from("contact_messages").select("*",{count:"exact",head:true}),
      s.from("newsletter_subscribers").select("*",{count:"exact",head:true}),
      s.from("admin_notifications").select("*",{count:"exact",head:true}).eq("is_read",false)
    ]);
    adminCounts={
      memberships:m.count||0,
      messages:c.count||0,
      subscribers:n.count||0,
      notifications:notifs.count||0
    };
  }

  const [a,e,p]=contentCounts;

  return <main className="adminPage adminPageV17">
    <section className="adminHero adminHeroV17"><div className="wrap adminHeroRow">
      <div>
        <span className="eyebrow">Phase 17 Control Center</span>
        <h1>خوش آمدید، {ctx?.fullName}</h1>
        <p>{ctx?.role==="admin"?"مکمل انتظامی نگرانی، permissions، notifications اور system monitoring۔":"Content Editor — علمی و تنظیمی مواد کی تدوین اور اشاعت۔"}</p>
      </div>
      <form action={logout}><button className="adminLogout">لاگ آؤٹ</button></form>
    </div></section>

    <section className="section"><div className="wrap">
      <div className={`adminStats ${ctx?.role==="admin"?"phase17Stats":"editorStatsV17"}`}>
        <div><strong>{a.count||0}</strong><span>مضامین</span></div>
        <div><strong>{e.count||0}</strong><span>سرگرمیاں</span></div>
        <div><strong>{p.count||0}</strong><span>شخصیات</span></div>
        {adminCounts&&<>
          <div><strong>{adminCounts.memberships}</strong><span>رکنیت</span></div>
          <div><strong>{adminCounts.messages}</strong><span>پیغامات</span></div>
          <div><strong>{adminCounts.subscribers}</strong><span>Subscribers</span></div>
        </>}
      </div>

      {adminCounts&&adminCounts.notifications>0&&
        <Link className="notificationBannerV17" href="/admin/notifications">
          <span>●</span><div><b>{adminCounts.notifications} نئی Notifications</b><p>نئی درخواستیں، رابطہ پیغامات یا subscribers دیکھیں۔</p></div><strong>دیکھیں ←</strong>
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
            <div className="moduleGroupHeadV17"><span>Communication</span><h2>درخواستیں اور رابطہ</h2></div>
            <div className="adminModules">
              <Link href="/admin/memberships"><b>رکنیت درخواستیں</b><span>موصولہ فارم ←</span></Link>
              <Link href="/admin/messages"><b>رابطہ پیغامات</b><span>Inbox ←</span></Link>
              <Link href="/admin/subscribers"><b>Newsletter</b><span>Subscribers ←</span></Link>
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
              <Link href="/admin/export"><b>Backup / Export</b><span>JSON backup ←</span></Link>
              <Link href="/admin/launch"><b>Launch Audit</b><span>Production checklist ←</span></Link>
            </div>
          </section>
        </>}
      </div>
    </div></section>
  </main>
}
