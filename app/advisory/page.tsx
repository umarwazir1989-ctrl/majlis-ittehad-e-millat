import Link from "next/link";
import { advisory } from "../../data/people";

export default function AdvisoryPage(){
  return <main>
    <section className="pageHero peopleHero advisoryHero"><div className="wrap">
      <span className="eyebrow">اجتماعی مشاورت</span>
      <h1>مجلس مشاورت</h1>
      <p>مختلف علمی، فکری اور ملی پہلوؤں پر رائے، مشاورت اور مشترکہ حکمتِ عملی کی تشکیل کے لیے مجلس کا مشاورتی حلقہ۔</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="heading"><span className="eyebrow">مشاورتی حلقہ</span><h2>مجلس مشاورت کی شخصیات</h2><p>یہ فہرست فراہم کردہ ابتدائی مواد کے مطابق ہے؛ مزید شخصیات اور تفصیلات حتمی منظوری کے بعد شامل ہوں گی۔</p></div>
      <div className="peopleGrid">
        {advisory.map((person)=><article className="profileCard advisoryCard" key={person.slug}>
          <div className="profileTop"><div className="profileAvatar">{person.initials}</div><span className="councilBadge">{person.council}</span></div>
          <h3>{person.name}</h3>
          <p className="designation">{person.designation}</p>
          <p>{person.summary}</p>
          <div className="expertise">{person.expertise.map(x=><span key={x}>{x}</span>)}</div>
          <Link className="profileLink" href={`/people/${person.slug}`}>مکمل پروفائل دیکھیں ←</Link>
        </article>)}
      </div>
      <div className="sourceNote">یہ صفحہ Phase 3 کا ابتدائی پروفائل سسٹم ہے؛ اصل تصاویر اور مفصل تعارف بعد میں شامل کیے جا سکتے ہیں۔</div>
    </div></section>
  </main>
}
