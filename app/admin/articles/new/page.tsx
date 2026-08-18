import Link from "next/link";
import ImageUploader from "../../../../components/admin/ImageUploader";
import WorkflowFields from "../../../../components/admin/WorkflowFields";
import {getAdminContext} from "../../../../lib/admin/auth";
import {createArticle} from "../../actions";

export default async function Page(){
  const ctx=await getAdminContext();
  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin/articles">مضامین ←</Link><h1>نیا مضمون</h1>
    </div></section>
    <section className="section"><div className="wrap">
      <form className="adminEditForm" action={createArticle}>
        <label>عنوان<input name="title" required/></label>
        <label>Slug<input name="slug" required/></label>
        <div className="g2">
          <label>زمرہ<input name="category" required/></label>
          <label>مصنف<input name="author" defaultValue="مجلس اتحادِ ملت"/></label>
        </div>
        <ImageUploader folder="articles" label="نمایاں تصویر"/>
        <label>خلاصہ<textarea name="excerpt" required/></label>
        <label>مضمون<textarea className="longEditor" name="content" required/></label>
        <WorkflowFields role={ctx!.role}/>
        {ctx?.role==="admin"&&<label>Review Note<textarea name="review_note"/></label>}
        <button className="btn">محفوظ کریں</button>
      </form>
    </div></section>
  </main>
}
