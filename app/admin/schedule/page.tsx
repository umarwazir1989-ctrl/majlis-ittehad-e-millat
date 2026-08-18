import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";
import {cancelSchedule,publishNow} from "../actions";

type ScheduledItem={
  id:string;
  title:string;
  scheduled_for:string|null;
  kind:"articles"|"activities";
};

export default async function SchedulePage(){
  await requireAdminOnly();
  const s=await createClient();

  const [{data:articles,error:aErr},{data:activities,error:eErr}]=await Promise.all([
    s.from("articles").select("id,title,scheduled_for").eq("status","scheduled").order("scheduled_for",{ascending:true}),
    s.from("activities").select("id,title,scheduled_for").eq("status","scheduled").order("scheduled_for",{ascending:true})
  ]);

  if(aErr)throw new Error(aErr.message);
  if(eErr)throw new Error(eErr.message);

  const rows:ScheduledItem[]=[
    ...(articles||[]).map(x=>({...x,kind:"articles" as const})),
    ...(activities||[]).map(x=>({...x,kind:"activities" as const}))
  ].sort((a,b)=>new Date(a.scheduled_for||0).getTime()-new Date(b.scheduled_for||0).getTime());

  const now=Date.now();

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <span className="eyebrow">Publishing Calendar</span>
      <h1>Scheduled Content</h1>
      <p>طے شدہ وقت آنے پر scheduled مواد public website پر خود دکھائی دینے لگے گا۔</p>
    </div></section>

    <section className="section"><div className="wrap scheduleListV18">
      {rows.length?rows.map(item=>{
        const due=item.scheduled_for&&new Date(item.scheduled_for).getTime()<=now;
        return <article className={`scheduleCardV18 ${due?"due":""}`} key={`${item.kind}-${item.id}`}>
          <div>
            <span>{item.kind==="articles"?"مضمون":"سرگرمی"}</span>
            <h2>{item.title}</h2>
            <time>{item.scheduled_for?new Date(item.scheduled_for).toLocaleString("ur-PK"):"تاریخ موجود نہیں"}</time>
          </div>
          <div className="scheduleActionsV18">
            {due&&<b>وقت آ چکا ہے — public visibility فعال ہے</b>}
            <form action={publishNow.bind(null,item.kind,item.id)}><button className="publish">Publish Now</button></form>
            <form action={cancelSchedule.bind(null,item.kind,item.id)}><button>Cancel Schedule</button></form>
          </div>
        </article>
      }):<div className="emptyState"><b>کوئی scheduled content موجود نہیں</b></div>}
    </div></section>
  </main>
}
