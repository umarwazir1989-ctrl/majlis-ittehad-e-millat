import Link from "next/link";
import { leadership } from "../../data/people";

export default function LeadershipPage(){
  return <main>
    <section className="pageHero peopleHero"><div className="wrap">
      <span className="eyebrow">علمی رہنمائی</span>
      <h1>مجلس بزرگان</h1>
      <p>مجلس کی اعلیٰ علمی و مشاورتی سطح، جہاں تجربہ، علمی وقار اور اجتماعی بصیرت مجلس کی فکری سمت اور اہم ترجیحات میں رہنمائی فراہم کرتی ہے۔</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="heading"><span className="eyebrow">اہلِ علم</span><h2>مجلس بزرگان کی شخصیات</h2><p>ذیل میں وہ نام شامل ہیں جو فراہم کردہ ابتدائی مواد میں مجلس بزرگان کے تحت موجود ہیں۔ تفصیلی سوانحی معلومات بعد میں مستند طور پر شامل کی جائیں گی۔</p></div>
      <div className="peopleGrid">
        {leadership.map((person)=><article className="profileCard" key={person.slug}>
          <div className="profileTop"><div className="profileAvatar">{person.initials}</div><span className="councilBadge">{person.council}</span></div>
          <h3>{person.name}</h3>
          <p className="designation">{person.designation}</p>
          <p>{person.summary}</p>
          <div className="expertise">{person.expertise.map(x=><span key={x}>{x}</span>)}</div>
          <Link className="profileLink" href={`/people/${person.slug}`}>مکمل پروفائل دیکھیں ←</Link>
        </article>)}
      </div>
      <div className="sourceNote">نوٹ: تصاویر، مکمل مناصب، تخصصات اور سوانحی تعارف حتمی منظوری اور مستند معلومات کے بعد شامل کیے جائیں گے۔</div>
    </div></section>
  </main>
}
