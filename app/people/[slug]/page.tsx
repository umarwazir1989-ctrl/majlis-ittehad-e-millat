import Link from "next/link";
import { notFound } from "next/navigation";
import { getPerson, people } from "../../../data/people";

export function generateStaticParams(){
  return people.map((person)=>({slug:person.slug}));
}

export default async function PersonProfile({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const person=getPerson(slug);
  if(!person) notFound();

  return <main>
    <section className="profileHero"><div className="wrap profileHeroGrid">
      <div className="largeAvatar">{person.initials}</div>
      <div>
        <span className="councilBadge">{person.council}</span>
        <h1>{person.name}</h1>
        <p className="profileRole">{person.designation}</p>
        <p>{person.summary}</p>
      </div>
    </div></section>

    <section className="section"><div className="wrap profileLayout">
      <article className="profileMain">
        <span className="eyebrow">مختصر تعارف</span>
        <h2>علمی و مشاورتی پروفائل</h2>
        {person.bio.map((p,i)=><p key={i}>{p}</p>)}
        <div className="sourceNote">یہ تعارف فی الحال محدود ہے۔ غیر مصدقہ سوانحی معلومات شامل نہیں کی گئی ہیں۔</div>
      </article>
      <aside className="profileSide">
        <div className="sideBox"><h3>مجلس میں حیثیت</h3><strong>{person.council}</strong><p>{person.designation}</p></div>
        <div className="sideBox"><h3>متعلقہ شعبے</h3><div className="expertise">{person.expertise.map(x=><span key={x}>{x}</span>)}</div></div>
        <div className="sideBox"><h3>شہر / ادارہ</h3><p>{person.city}</p></div>
      </aside>
    </div></section>

    <div className="wrap profileBack"><Link href={person.council==="مجلس بزرگان"?"/leadership":"/advisory"}>← متعلقہ مجلس پر واپس جائیں</Link></div>
  </main>
}
