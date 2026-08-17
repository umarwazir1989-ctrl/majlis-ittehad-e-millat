import Link from "next/link";
import {notFound} from "next/navigation";
import ImageUploader from "../../../../../components/admin/ImageUploader";
import {createClient} from "../../../../../lib/supabase/server";
import {updateArticle} from "../../../actions";
export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const s=await createClient(); const {data}=await s.from("articles").select("*").eq("id",id).maybeSingle(); if(!data) notFound();
 return <main className="adminPage"><section className="adminSubHero"><div className="wrap"><Link href="/admin/articles">مضامین ←</Link><h1>مضمون میں ترمیم</h1></div></section>
 <section className="section"><div className="wrap"><form className="adminEditForm" action={updateArticle.bind(null,id)}>
 <label>عنوان<input name="title" required defaultValue={data.title}/></label><label>Slug<input name="slug" required defaultValue={data.slug}/></label>
 <div className="g2"><label>زمرہ<input name="category" required defaultValue={data.category}/></label><label>مصنف<input name="author" defaultValue={data.author||""}/></label></div>
 <ImageUploader folder="articles" value={data.image_url||""} label="نمایاں تصویر"/>
 <label>خلاصہ<textarea name="excerpt" defaultValue={data.excerpt||""}/></label><label>مضمون<textarea className="longEditor" name="content" defaultValue={data.content||""}/></label>
 <label>حیثیت<select name="status" defaultValue={data.status}><option value="draft">Draft</option><option value="published">Published</option></select></label>
 <button className="btn">تبدیلی محفوظ کریں</button></form></div></section></main>
}
