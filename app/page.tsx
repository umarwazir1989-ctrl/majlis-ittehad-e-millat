import Link from "next/link";
import {getPublicActivities,getPublicArticles} from "../lib/content/public";

export const dynamic="force-dynamic";

const pillars=[
  {icon:"shield",title:"اخلاص و دیانت",text:"دینی و ملی امور میں اخلاص، دیانت اور خیر خواہی کو بنیادی قدر سمجھنا۔"},
  {icon:"unity",title:"عملی وحدت",text:"قومی و اجتماعی مسائل کے حل کے لیے مشترکات کو مضبوط بنیاد بنانا۔"},
  {icon:"book",title:"تحقیق و فکر",text:"معیاری تحقیق، مطالعہ اور علمی رہنمائی کے ذریعے فکری بلوغ پیدا کرنا۔"},
  {icon:"dialogue",title:"حوار و مکالمہ",text:"احترام اور شائستگی کے ساتھ سنجیدہ علمی اور فکری گفتگو کو فروغ دینا۔"},
  {icon:"people",title:"مختلف مکاتبِ فکر",text:"مختلف مکاتبِ فکر اور اداروں کے اہلِ علم کو باہمی تعاون کے لیے قریب لانا۔"}
];

function Icon({name}:{name:string}){
  if(name==="shield")return <svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.8 2.8 8 7 10 4.2-2 7-5.2 7-10V6l-7-3Z"/><path d="m9.5 12 1.7 1.7 3.7-4"/></svg>;
  if(name==="book")return <svg viewBox="0 0 24 24"><path d="M4 5.5c3-.8 5.6-.2 8 2v12c-2.4-2.2-5-2.8-8-2V5.5Z"/><path d="M20 5.5c-3-.8-5.6-.2-8 2v12c2.4-2.2 5-2.8 8-2V5.5Z"/></svg>;
  if(name==="dialogue")return <svg viewBox="0 0 24 24"><path d="M4 5h11v8H9l-4 3v-3H4V5Z"/><path d="M14 9h6v8h-2v3l-4-3h-2"/></svg>;
  if(name==="people")return <svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M3.5 18c.4-3 2-4.5 4.5-4.5S12 15 12.5 18"/><path d="M11.5 18c.5-3 2-4.5 4.5-4.5s4.1 1.5 4.5 4.5"/></svg>;
  return <svg viewBox="0 0 24 24"><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19c.5-4 2.4-6 5-6s4.5 2 5 6"/><path d="M11 19c.5-4 2.4-6 5-6s4.5 2 5 6"/></svg>;
}

export default async function HomePage(){
  const [articles,activities]=await Promise.all([getPublicArticles(),getPublicActivities()]);
  const latestArticles=articles.slice(0,3);
  const latestActivities=activities.slice(0,2);

  return <main className="homeV15">
    <section className="proHeroV15">
      <div className="proHeroPatternV15" aria-hidden="true"></div>
      <div className="wrap proHeroGridV15">
        <div className="proHeroCopyV15">
          <div className="proKickerV15"><span></span>ایک قومی فکری پلیٹ فارم<span></span></div>
          <h1>فکری ہم آہنگی، علمی مکالمہ<br/>اور ملی وحدت</h1>
          <p>
            مجلس اتحادِ ملت اہلِ علم، اہلِ فکر، فکری شخصیات اور مختلف مکاتبِ فکر کے درمیان
            احترام، باہمی اعتماد اور مشترکہ قومی و ملی مسائل میں تعاون کے لیے ایک علمی و مشاورتی پلیٹ فارم ہے۔
          </p>
          <div className="proHeroActionsV15">
            <Link className="proPrimaryBtnV15" href="/about">مجلس کے بارے میں جانیں</Link>
            <Link className="proSecondaryBtnV15" href="/membership">ہمیں جوائن کریں</Link>
          </div>
        </div>

        <aside className="proMessageCardV15">
          <div className="proMessageIconV15">
            <Icon name="book"/>
          </div>
          <h2>مجلس کا بنیادی پیغام</h2>
          <p>اختلاف خیال اور اختلاف رائے فطری ہیں، لیکن فکری وسعت، تحمل اور احترام کے ساتھ مکالمہ ہماری مشترکہ ذمہ داری ہے۔</p>
          <div className="proVerseV15">
            <span>“</span>
            <b>وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ</b>
            <span>”</span>
          </div>
          <small>سورۃ المائدہ: 2</small>
        </aside>
      </div>

      <div className="wrap proPillarStripV15">
        {pillars.map(p=><article key={p.title}>
          <div className="proPillarIconV15"><Icon name={p.icon}/></div>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </article>)}
      </div>
    </section>

    <section className="proAboutSectionV15">
      <div className="wrap">
        <div className="proSectionHeadV15">
          <span>ہم کون ہیں؟</span>
          <h2>مجلس اتحادِ ملت کیا ہے؟</h2>
          <p>
            ایک غیر جماعتی، غیر فرقہ وارانہ اور غیر انتخابی علمی و مشاورتی فورم،
            جس کا مقصد مختلف فکری مکاتب کے درمیان تعمیری مکالمہ، باہمی احترام اور ملی یکجہتی کو فروغ دینا ہے۔
          </p>
        </div>

        <div className="proAboutBodyV15">
          <div className="proScholarVisualV15" aria-hidden="true">
            <div className="proBookStackV15"><i></i><i></i><i></i></div>
            <div className="proInkV15"></div>
            <div className="proQuillV15"></div>
          </div>

          <div className="proForumsV15">
            <div className="proForumsTitleV15"><span></span><h3>ہمارے اہم فورمز</h3><span></span></div>
            <div className="proForumGridV15">
              <Link href="/leadership" className="proForumCardV15">
                <div className="proForumBadgeV15 gold"><Icon name="people"/></div>
                <div><span>علمی رہنمائی</span><h3>مجلس بزرگان</h3><p>دانشمندوں، روحانی و فکری قائدین اور ممتاز شخصیات پر مشتمل اعلیٰ علمی فورم۔</p><b>تفصیل دیکھیں ←</b></div>
              </Link>
              <Link href="/advisory" className="proForumCardV15">
                <div className="proForumBadgeV15 green"><Icon name="unity"/></div>
                <div><span>اجتماعی مشاورت</span><h3>مجلس مشاورت</h3><p>اہلِ علم و فکر اور ماہرین پر مشتمل مشاورتی فورم جو اہم مسائل پر تجاویز مرتب کرتا ہے۔</p><b>تفصیل دیکھیں ←</b></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {(latestArticles.length>0||latestActivities.length>0)&&
      <section className="proUpdatesSectionV15">
        <div className="wrap">
          <div className="proSectionHeadV15 compact">
            <span>تازہ ترین</span>
            <h2>علمی مواد اور سرگرمیاں</h2>
          </div>
          <div className="proUpdatesGridV15">
            {latestArticles.map(a=><Link className="proUpdateCardV15" href={`/articles/${a.slug}`} key={a.slug}>
              <span className="proUpdateTypeV15">مضمون</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <b>مکمل پڑھیں ←</b>
            </Link>)}
            {latestActivities.map(a=><Link className="proUpdateCardV15 activity" href={`/activities/${a.slug}`} key={a.slug}>
              <span className="proUpdateTypeV15">سرگرمی</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <b>تفصیل دیکھیں ←</b>
            </Link>)}
          </div>
        </div>
      </section>
    }
  </main>
}
