import {getSitePage} from "../../lib/content/site-pages";
export const dynamic="force-dynamic";
export const metadata={title:"تعارف",description:"مجلس اتحادِ ملت کا تعارف، بنیادی شناخت اور علمی و مشاورتی سمت۔"};

export default async function AboutPage(){
  const page=await getSitePage("about");
  if(!page)return null;

  return <main>
    <section className="pageHero sourcePageHero"><div className="wrap">
      <span className="eyebrow">{page.eyebrow}</span>
      <h1>{page.title}</h1>
      <p>{page.summary}</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="sourceContentGrid">
        {page.sections.map((section,i)=><article className="sourceContentCard" key={section.title}>
          <span className="sourceNumber">{String(i+1).padStart(2,"0")}</span>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </article>)}
      </div>
      <div className="sourceIntegrityNote">
        یہ تعارف فراہم کردہ مجلس کے بنیادی وژن و تعارفی مواد کی بنیاد پر مرتب ہے؛ غیر مصدقہ تاریخی یا شخصی تفصیلات شامل نہیں کی گئیں۔
      </div>
    </div></section>
  </main>
}
