import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {deleteSubscriber,setSubscriberStatus} from "./actions";

export default async function SubscribersPage(){
  const s=await createClient();
  const {data,error}=await s.from("newsletter_subscribers").select("*").order("created_at",{ascending:false});
  if(error)throw new Error(error.message);
  const rows=data||[];
  const active=rows.filter(x=>x.status==="active").length;

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap adminSubRow">
      <div><Link href="/admin">ڈیش بورڈ ←</Link><h1>Newsletter Subscribers</h1></div>
      <a className="adminAdd" href="/api/admin/subscribers">CSV Export</a>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="subscriberStatsV16">
        <div><strong>{rows.length}</strong><span>کل ریکارڈ</span></div>
        <div><strong>{active}</strong><span>Active</span></div>
        <div><strong>{rows.length-active}</strong><span>Unsubscribed</span></div>
      </div>

      <div className="adminTable">
        {rows.length?rows.map(x=><div className="subscriberRowV16" key={x.id}>
          <div><b>{x.email}</b><span>{x.source||"footer"} • {new Date(x.created_at).toLocaleDateString("ur-PK")}</span></div>
          <div className="subscriberActionsV16">
            <em className={x.status==="active"?"active":"off"}>{x.status}</em>
            {x.status==="active"
              ?<form action={setSubscriberStatus.bind(null,x.id,"unsubscribed")}><button>Unsubscribe</button></form>
              :<form action={setSubscriberStatus.bind(null,x.id,"active")}><button>Activate</button></form>}
            <form action={deleteSubscriber.bind(null,x.id)}><button className="danger">حذف</button></form>
          </div>
        </div>):<div className="emptyState"><b>ابھی کوئی subscriber نہیں</b></div>}
      </div>
    </div></section>
  </main>
}
