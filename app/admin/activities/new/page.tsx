import Link from "next/link";
import ImageUploader from "../../../../components/admin/ImageUploader";
import {createActivity} from "../../actions";
export default function Page(){return <main className="adminPage"><section className="adminSubHero"><div className="wrap"><Link href="/admin/activities">سرگرمیاں ←</Link><h1>نئی سرگرمی</h1></div></section>
<section className="section"><div className="wrap"><form className="adminEditForm" action={createActivity}>
<label>عنوان<input name="title" required/></label><label>Slug<input name="slug" required/></label>
<div className="g2"><label>نوعیت<input name="type" required/></label><label>تاریخ<input type="date" name="event_date"/></label></div>
<label>مقام<input name="location"/></label><ImageUploader folder="activities" label="نمایاں تصویر"/>
<label>خلاصہ<textarea name="excerpt" required/></label><label>تفصیل<textarea className="longEditor" name="content" required/></label>
<label>حیثیت<select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></label>
<button className="btn">محفوظ کریں</button></form></div></section></main>}
