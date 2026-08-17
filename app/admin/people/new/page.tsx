import Link from "next/link";
import ImageUploader from "../../../../components/admin/ImageUploader";
import {createPerson} from "../../actions";
export default function Page(){return <main className="adminPage">
<section className="adminSubHero"><div className="wrap"><Link href="/admin/people">شخصیات ←</Link><h1>نئی شخصیت</h1></div></section>
<section className="section"><div className="wrap"><form className="adminEditForm" action={createPerson}>
<label>نام<input name="name" required/></label>
<label>Slug<input name="slug" required placeholder="person-name"/></label>
<div className="g2">
<label>مجلس<select name="council" defaultValue="مجلس بزرگان"><option>مجلس بزرگان</option><option>مجلس مشاورت</option></select></label>
<label>عہدہ<input name="designation"/></label>
</div>
<ImageUploader folder="people" label="پروفائل تصویر"/>
<label>مختصر تعارف<textarea name="summary"/></label>
<label>مکمل تعارف<textarea className="longEditor" name="bio"/></label>
<button className="btn">محفوظ کریں</button>
</form></div></section></main>}
