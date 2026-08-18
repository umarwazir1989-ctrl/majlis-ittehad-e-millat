import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";

function dayKey(date:Date){
  return date.toISOString().slice(0,10);
}

export default async function AnalyticsPage(){
  await requireAdminOnly();
  const s=await createClient();

  const now=new Date();
  const since30=new Date(now.getTime()-30*24*60*60*1000).toISOString();
  const since7=new Date(now.getTime()-7*24*60*60*1000).getTime();
  const today=dayKey(now);

  const [
    {data:events,error:eventError},
    {count:memberships},
    {count:messages},
    {count:subscribers},
    {count:articles},
    {count:activities}
  ]=await Promise.all([
    s.from("analytics_events").select("path,created_at").gte("created_at",since30).order("created_at",{ascending:true}).limit(10000),
    s.from("membership_applications").select("*",{count:"exact",head:true}).gte("created_at",since30),
    s.from("contact_messages").select("*",{count:"exact",head:true}).gte("created_at",since30),
    s.from("newsletter_subscribers").select("*",{count:"exact",head:true}).gte("created_at",since30),
    s.from("articles").select("*",{count:"exact",head:true}).eq("status","published").gte("published_at",since30),
    s.from("activities").select("*",{count:"exact",head:true}).eq("status","published").gte("published_at",since30)
  ]);

  if(eventError)throw new Error(eventError.message);

  const rows=events||[];
  const views30=rows.length;
  const views7=rows.filter(x=>new Date(x.created_at).getTime()>=since7).length;
  const viewsToday=rows.filter(x=>dayKey(new Date(x.created_at))===today).length;

  const paths=new Map<string,number>();
  rows.forEach(x=>paths.set(x.path,(paths.get(x.path)||0)+1));
  const topPages=[...paths.entries()].sort((a,b)=>b[1]-a[1]).slice(0,10);
  const topMax=Math.max(1,...topPages.map(x=>x[1]));

  const daily=Array.from({length:14},(_,i)=>{
    const d=new Date(now.getTime()-(13-i)*24*60*60*1000);
    return {key:dayKey(d),label:d.toLocaleDateString("ur-PK",{month:"short",day:"numeric"}),count:0};
  });
  const dailyMap=new Map(daily.map(x=>[x.key,x]));
  rows.forEach(x=>{
    const k=dayKey(new Date(x.created_at));
    const item=dailyMap.get(k);
    if(item)item.count++;
  });
  const dailyMax=Math.max(1,...daily.map(x=>x.count));

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <span className="eyebrow">Privacy-friendly Analytics</span>
      <h1>Analytics Dashboard</h1>
      <p>صرف page path اور timestamp شمار ہوتے ہیں؛ IP address یا tracking cookie محفوظ نہیں کی جاتی۔</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="analyticsStatsV18">
        <div><strong>{viewsToday}</strong><span>آج کے Page Views</span></div>
        <div><strong>{views7}</strong><span>7 دن</span></div>
        <div><strong>{views30}</strong><span>30 دن</span></div>
        <div><strong>{memberships||0}</strong><span>رکنیت درخواستیں</span></div>
        <div><strong>{messages||0}</strong><span>رابطہ پیغامات</span></div>
        <div><strong>{subscribers||0}</strong><span>نئے Subscribers</span></div>
      </div>

      <div className="analyticsGridV18">
        <section className="analyticsPanelV18">
          <div className="analyticsPanelHeadV18"><div><span>Last 14 Days</span><h2>روزانہ Page Views</h2></div></div>
          <div className="dailyBarsV18">
            {daily.map(x=><div className="dayBarV18" key={x.key}>
              <div className="barTrackV18"><i style={{height:`${Math.max(4,(x.count/dailyMax)*100)}%`}}></i></div>
              <b>{x.count}</b>
              <span>{x.label}</span>
            </div>)}
          </div>
        </section>

        <section className="analyticsPanelV18">
          <div className="analyticsPanelHeadV18"><div><span>Top Content</span><h2>سب سے زیادہ دیکھے گئے صفحات</h2></div></div>
          <div className="topPagesV18">
            {topPages.length?topPages.map(([path,count],i)=><div key={path}>
              <span>{String(i+1).padStart(2,"0")}</span>
              <div><b>{path}</b><i><em style={{width:`${(count/topMax)*100}%`}}></em></i></div>
              <strong>{count}</strong>
            </div>):<p>Analytics data ابھی جمع ہونا شروع نہیں ہوا۔</p>}
          </div>
        </section>
      </div>

      <div className="analyticsContentStatsV18">
        <article><span>گزشتہ 30 دن</span><strong>{articles||0}</strong><b>Published مضامین</b></article>
        <article><span>گزشتہ 30 دن</span><strong>{activities||0}</strong><b>Published سرگرمیاں</b></article>
      </div>
    </div></section>
  </main>
}
