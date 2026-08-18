import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";
import {reviewContent,scheduleContent} from "../actions";

type Item={
  id:string;
  title:string;
  status:string;
  created_at:string;
  review_note?:string|null;
  kind:"articles"|"activities";
};

export default async function ReviewPage(){
  await requireAdminOnly();
  const s=await createClient();

  const [{data:articles,error:aErr},{data:activities,error:eErr}]=await Promise.all([
    s.from("articles").select("id,title,status,created_at,review_note").in("status",["review","approved","rejected"]).order("created_at",{ascending:false}),
    s.from("activities").select("id,title,status,created_at,review_note").in("status",["review","approved","rejected"]).order("created_at",{ascending:false})
  ]);

  if(aErr)throw new Error(aErr.message);
  if(eErr)throw new Error(eErr.message);

  const rows:Item[]=[
    ...(articles||[]).map(x=>({...x,kind:"articles" as const})),
    ...(activities||[]).map(x=>({...x,kind:"activities" as const}))
  ].sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <span className="eyebrow">Editorial Workflow</span>
      <h1>Review Queue</h1>
      <p>Editor کی submissions کو approve، publish، reject یا schedule کریں۔</p>
    </div></section>

    <section className="section"><div className="wrap reviewQueueV18">
      {rows.length?rows.map(item=><article className="reviewCardV18" key={`${item.kind}-${item.id}`}>
        <div className="reviewCardHeadV18">
          <div>
            <span>{item.kind==="articles"?"مضمون":"سرگرمی"}</span>
            <h2>{item.title}</h2>
            <small>{new Date(item.created_at).toLocaleString("ur-PK")}</small>
          </div>
          <span className={`workflowBadgeV18 ${item.status}`}>{item.status}</span>
        </div>

        {item.review_note&&<p className="reviewPreviousNoteV18">{item.review_note}</p>}

        <div className="reviewActionsV18">
          <form action={reviewContent.bind(null,item.kind,item.id,"approved")}>
            <textarea name="review_note" placeholder="Review note (اختیاری)"/>
            <button className="approve">Approve</button>
          </form>

          <form action={reviewContent.bind(null,item.kind,item.id,"published")}>
            <textarea name="review_note" placeholder="Publish note (اختیاری)"/>
            <button className="publish">Publish Now</button>
          </form>

          <form action={scheduleContent.bind(null,item.kind,item.id)}>
            <input type="datetime-local" name="scheduled_for" required/>
            <textarea name="review_note" placeholder="Schedule note (اختیاری)"/>
            <button className="schedule">Schedule</button>
          </form>

          <form action={reviewContent.bind(null,item.kind,item.id,"rejected")}>
            <textarea name="review_note" placeholder="وجہ لکھیں"/>
            <button className="reject">Reject</button>
          </form>
        </div>
      </article>):<div className="emptyState"><b>Review queue خالی ہے</b></div>}
    </div></section>
  </main>
}
