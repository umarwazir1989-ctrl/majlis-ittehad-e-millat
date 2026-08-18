import Link from "next/link";
import {notFound} from "next/navigation";
import ImageUploader from "../../../../../components/admin/ImageUploader";
import WorkflowFields from "../../../../../components/admin/WorkflowFields";
import {createClient} from "../../../../../lib/supabase/server";
import {getAdminContext} from "../../../../../lib/admin/auth";
import {updateActivity} from "../../../actions";

export default async function Page({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const ctx=await getAdminContext();
  const s=await createClient();
  const {data}=await s.from("activities").select("*").eq("id",id).maybeSingle();
  if(!data)notFound();

  const editorLocked=ctx?.role==="editor"&&!["draft","review"].includes(data.status);

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin/activities">سرگرمیاں ←</Link><h1>سرگرمی میں ترمیم</h1>
    </div></section>
    <section className="section"><div className="wrap">
      {editorLocked?
        <div className="workflowLockV18">
          <b>یہ سرگرمی Editor کے لیے Locked ہے</b>
          <p>Approved، Scheduled یا Published مواد صرف Admin دوبارہ Draft میں بھیج سکتا ہے۔</p>
          <Link href="/admin/activities">واپس جائیں</Link>
        </div>
      :
        <form className="adminEditForm" action={updateActivity.bind(null,id)}>
          <label>عنوان<input name="title" required defaultValue={data.title}/></label>
          <label>Slug<input name="slug" required defaultValue={data.slug}/></label>
          <div className="g2">
            <label>نوعیت<input name="type" required defaultValue={data.type}/></label>
            <label>تاریخ<input type="date" name="event_date" defaultValue={data.event_date||""}/></label>
          </div>
          <label>مقام<input name="location" defaultValue={data.location||""}/></label>
          <ImageUploader folder="activities" value={data.image_url||""} label="نمایاں تصویر"/>
          <label>خلاصہ<textarea name="excerpt" defaultValue={data.excerpt||""}/></label>
          <label>تفصیل<textarea className="longEditor" name="content" defaultValue={data.content||""}/></label>
          <WorkflowFields role={ctx!.role} status={data.status} scheduledFor={data.scheduled_for}/>
          {ctx?.role==="admin"&&<label>Review Note<textarea name="review_note" defaultValue={data.review_note||""}/></label>}
          <button className="btn">تبدیلی محفوظ کریں</button>
        </form>
      }
    </div></section>
  </main>
}
