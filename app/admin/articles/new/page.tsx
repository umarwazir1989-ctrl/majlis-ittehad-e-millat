import Link from "next/link";
import ImageUploader from "../../../../components/admin/ImageUploader";
import {createArticle} from "../../actions";
export default function Page(){return <main className="adminPage">
<section className="adminSubHero"><div className="wrap"><Link href="/admin/articles">مضامین ←</Link><h1>نیا مضمون</h1></div></section>
<section className="section"><div className="wrap"><form className="adminEditForm" action={createArticle}>
<label>عنوان<input name="title" required/></label><label>Slug<input name="slug" required/></label>
<div className="g2"><label>زمرہ<input name="category" required/></label><label>مصنف<input name="author" defaultValue="مجلس اتحادِ ملت"/></label></div>
<ImageUploader folder="articles" label="نمایاں تصویر"/>
<label>خلاصہ<textarea name="excerpt" required/></label><label>مضمون<textarea className="longEditor" name="content" required/></label>
<label>حیثیت<select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></label>
<button className="btn">محفوظ کریں</button></form></div></section></main>}
