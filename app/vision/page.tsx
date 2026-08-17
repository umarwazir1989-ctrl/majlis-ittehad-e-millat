import {getSitePage} from "../../lib/content/site-pages";
export const dynamic="force-dynamic";
export const metadata={title:"وژن و اہداف",description:"مجلس اتحادِ ملت کے وژن، بنیادی ستون اور عملی حکمتِ عملی۔"};

export default async function VisionPage(){
  const page=await getSitePage("vision");
  if(!page)return null;

  return <main>
    <section className="pageHero sourcePageHero visionSourceHero"><div className="wrap">
      <span className="eyebrow">{page.eyebrow}</span>
      <h1>{page.title}</h1>
      <p>{page.summary}</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="visionTimeline">
        {page.sections.map((section,i)=><article className="visionTimelineItem" key={section.title}>
          <div className="visionTimelineNo">{String(i+1).padStart(2,"0")}</div>
          <div className="visionTimelineBody">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        </article>)}
      </div>
    </div></section>
  </main>
}
