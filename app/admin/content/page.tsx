import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {fallbackSitePages} from "../../../data/site-pages";
import {updateSitePage} from "./actions";

export default async function ContentAdmin(){
  const supabase=await createClient();
  const {data}=await supabase.from("site_pages").select("*").in("slug",["about","vision"]);

  const db=new Map((data||[]).map(x=>[x.slug,x]));

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <h1>بنیادی صفحات کا مواد</h1>
    </div></section>

    <section className="section"><div className="wrap contentAdminStack">
      {["about","vision"].map(slug=>{
        const fallback=fallbackSitePages[slug];
        const row=db.get(slug);
        const page={
          eyebrow:row?.eyebrow??fallback.eyebrow,
          title:row?.title??fallback.title,
          summary:row?.summary??fallback.summary,
          sections:Array.isArray(row?.sections)?row.sections:fallback.sections
        };

        return <form className="contentAdminCard" action={updateSitePage.bind(null,slug)} key={slug}>
          <div className="contentAdminHead">
            <div><span className="eyebrow">{slug==="about"?"تعارف":"وژن"}</span><h2>{page.title}</h2></div>
            <Link href={`/${slug}`}>Public Page ↗</Link>
          </div>

          <label>اوپری عنوان<input name="eyebrow" defaultValue={page.eyebrow}/></label>
          <label>مرکزی عنوان<input name="title" required defaultValue={page.title}/></label>
          <label>خلاصہ<textarea name="summary" required defaultValue={page.summary}/></label>

          <h3>حصے</h3>
          <div className="contentSectionsEditor">
            {page.sections.map((section:any,i:number)=><div className="contentSectionEdit" key={i}>
              <label>عنوان<input name="section_title" defaultValue={section.title}/></label>
              <label>متن<textarea name="section_body" defaultValue={section.body}/></label>
            </div>)}
          </div>

          <button className="btn">محفوظ کریں</button>
        </form>
      })}
    </div></section>
  </main>
}
