import Link from "next/link";
import {notFound} from "next/navigation";
import ImageUploader from "../../../../../components/admin/ImageUploader";
import {createClient} from "../../../../../lib/supabase/server";
import {updatePerson} from "../../../actions";
export default async function Page({params}:{params:Promise<{id:string}>}){
  const {id}=await params; const s=await createClient();
  const {data}=await s.from("people").select("*").eq("id",id).maybeSingle(); if(!data) notFound();
  return <main className="adminPage">
  <section className="adminSubHero"><div className="wrap"><Link href="/admin/people">شخصیات ←</Link><h1>شخصیت میں ترمیم</h1></div></section>
  <section className="section"><div className="wrap"><form className="adminEditForm" action={updatePerson.bind(null,id)}>
  <label>نام<input name="name" required defaultValue={data.name}/></label>
  <label>Slug<input name="slug" required defaultValue={data.slug}/></label>
  <div className="g2">
  <label>مجلس<select name="council" defaultValue={data.council}><option>مجلس بزرگان</option><option>مجلس مشاورت</option></select></label>
  <label>عہدہ<input name="designation" defaultValue={data.designation||""}/></label>
  </div>
  <ImageUploader folder="people" value={data.image_url||""} label="پروفائل تصویر"/>
  <label>مختصر تعارف<textarea name="summary" defaultValue={data.summary||""}/></label>
  <label>مکمل تعارف<textarea className="longEditor" name="bio" defaultValue={data.bio||""}/></label>
  <button className="btn">تبدیلی محفوظ کریں</button>
  </form></div></section></main>
}
