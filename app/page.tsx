import Link from "next/link";
import {getPublicActivities,getPublicArticles} from "../lib/content/public";
import {getSiteSettings} from "../lib/content/settings";

export const dynamic="force-dynamic";

function Icon({name}:{name:string}){
  if(name==="shield")return <svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.8 2.8 8 7 10 4.2-2 7-5.2 7-10V6l-7-3Z"/><path d="m9.5 12 1.7 1.7 3.7-4"/></svg>;
  if(name==="book")return <svg viewBox="0 0 24 24"><path d="M4 5.5c3-.8 5.6-.2 8 2v12c-2.4-2.2-5-2.8-8-2V5.5Z"/><path d="M20 5.5c-3-.8-5.6-.2-8 2v12c2.4-2.2 5-2.8 8-2V5.5Z"/></svg>;
  if(name==="dialogue")return <svg viewBox="0 0 24 24"><path d="M4 5h11v8H9l-4 3v-3H4V5Z"/><path d="M14 9h6v8h-2v3l-4-3h-2"/></svg>;
  if(name==="people")return <svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M3.5 18c.4-3 2-4.5 4.5-4.5S12 15 12.5 18"/><path d="M11.5 18c.5-3 2-4.5 4.5-4.5s4.1 1.5 4.5 4.5"/></svg>;
  if(name==="mail")return <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if(name==="phone")return <svg viewBox="0 0 24 24"><path d="M7 4 4.5 6.5c0 7.2 5.8 13 13 13L20 17l-4-3-2 2c-2.6-1-4.6-3-5.6-5.6l2-2L7 4Z"/></svg>;
  return <svg viewBox="0 0 24 24"><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19c.5-4 2.4-6 5-6s4.5 2 5 6"/><path d="M11 19c.5-4 2.4-6 5-6s4.5 2 5 6"/></svg>;
}

function whatsappUrl(phone:string){
  let digits=phone.replace(/\D/g,"");
  if(digits.startsWith("0"))digits=`92${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

export default async function HomePage(){
  const [articles,activities,settings]=await Promise.all([
    getPublicArticles(),getPublicActivities(),getSiteSettings()
  ]);

  const latestArticles=articles.slice(0,3);
  const latestActivities=activities.slice(0,2);
  const h=settings.home;
  const c=settings.contact;

  return <main className="homeProV19">
    <section className="homeHeroV19">
      <div className="homeHeroPatternV19" aria-hidden="true"></div>

      <div className="wrap homeHeroGridV19">
        <div className="homeHeroCopyV19">
          <div className="homeEyebrowV19"><span></span>{h.kicker}<span></span></div>
          <h1>{h.title}</h1>
          <p className="homeHeroLeadV19">{h.description}</p>

          <div className="homeIdentityV19">
            <span>غیر جماعتی</span>
            <i></i>
            <span>غیر انتخابی</span>
            <i></i>
            <span>علمی و مشاورتی</span>
          </div>

          <div className="homeHeroActionsV19">
            <Link className="homeBtnPrimaryV19" href={h.primary_url}>{h.primary_label}</Link>
            <Link className="homeBtnSecondaryV19" href={h.secondary_url}>{h.secondary_label}</Link>
          </div>
        </div>

        <aside className="homeMessageCardV19">
          <div className="homeMessageSealV19"><Icon name="book"/></div>
          <span className="homeMessageLabelV19">مرکزی فکر</span>
          <h2>{h.message_title}</h2>
          <p>{h.message_text}</p>
          <div className="homeVerseV19">
            <b>{h.verse_text}</b>
            <small>{h.verse_reference}</small>
          </div>
        </aside>
      </div>

      <div className="wrap homeValuesV19">
        {h.pillars.slice(0,5).map((p,i)=><article key={`${p.title}-${i}`}>
          <div className="homeValueIconV19"><Icon name={p.icon}/></div>
          <div><h3>{p.title}</h3><p>{p.text}</p></div>
        </article>)}
      </div>
    </section>

    <section className="homeIntroV19">
      <div className="wrap">
        <div className="homeSectionTitleV19">
          <span>{h.about_eyebrow}</span>
          <h2>{h.about_title}</h2>
          <p>{h.about_description}</p>
        </div>

        <div className="homeDefinitionGridV19">
          <article className="homeDefinitionV19 positive">
            <div className="homeDefNumberV19">01</div>
            <span>مجلس کیا ہے؟</span>
            <h3>مکالمے اور تعاون کا مشترکہ فورم</h3>
            <p>اہلِ علم و فکر کے درمیان علمی رابطہ، آدابِ اختلاف، فکری دفاع اور مشترکہ قومی و ملی مسائل پر اجتماعی غور و فکر کے لیے ایک سنجیدہ پلیٹ فارم۔</p>
          </article>

          <article className="homeDefinitionV19 neutral">
            <div className="homeDefNumberV19">02</div>
            <span>مجلس کیا نہیں ہے؟</span>
            <h3>نیا مسلک یا سیاسی اتحاد نہیں</h3>
            <p>مجلس کسی نئے مسلک، جماعت یا انتخابی اتحاد کی تشکیل نہیں؛ اس کی بنیاد احترامِ اختلاف، مشترکات اور علمی مشاورت پر ہے۔</p>
          </article>

          <article className="homeDefinitionV19 purpose">
            <div className="homeDefNumberV19">03</div>
            <span>مرکزی مقصد</span>
            <h3>اجتماعی شعور کو مضبوط بنانا</h3>
            <p>اختلاف کو علمی حدود میں رکھتے ہوئے امت اور ملک کے مشترکہ مسائل پر ذمہ دارانہ، متوازن اور قابلِ عمل فکری رہنمائی پیدا کرنا۔</p>
          </article>
        </div>
      </div>
    </section>

    <section className="homeForumsV19">
      <div className="wrap">
        <div className="homeSectionTitleV19 compact">
          <span>تنظیمی و علمی ساخت</span>
          <h2>{h.forums_title}</h2>
        </div>

        <div className="homeForumGridV19">
          <Link href="/leadership" className="homeForumCardV19">
            <div className="homeForumIconV19 gold"><Icon name="people"/></div>
            <div>
              <span>{h.elders_eyebrow}</span>
              <h3>{h.elders_title}</h3>
              <p>{h.elders_description}</p>
              <b>مجلس بزرگان دیکھیں ←</b>
            </div>
          </Link>

          <Link href="/advisory" className="homeForumCardV19">
            <div className="homeForumIconV19 green"><Icon name="dialogue"/></div>
            <div>
              <span>{h.advisory_eyebrow}</span>
              <h3>{h.advisory_title}</h3>
              <p>{h.advisory_description}</p>
              <b>مجلس مشاورت دیکھیں ←</b>
            </div>
          </Link>
        </div>
      </div>
    </section>

    {(latestArticles.length>0||latestActivities.length>0)&&
      <section className="homeUpdatesV19">
        <div className="wrap">
          <div className="homeSectionTitleV19 compact">
            <span>تازہ ترین</span>
            <h2>علمی مواد اور سرگرمیاں</h2>
            <p>مجلس کے تازہ علمی مباحث، مضامین اور اہم سرگرمیوں سے منتخب مواد۔</p>
          </div>

          <div className="homeUpdatesGridV19">
            {latestArticles.map(a=><Link className="homeUpdateCardV19" href={`/articles/${a.slug}`} key={a.slug}>
              <span className="homeContentTypeV19">مضمون</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <b>مکمل مضمون پڑھیں ←</b>
            </Link>)}

            {latestActivities.map(a=><Link className="homeUpdateCardV19 activity" href={`/activities/${a.slug}`} key={a.slug}>
              <span className="homeContentTypeV19">سرگرمی</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <b>تفصیل دیکھیں ←</b>
            </Link>)}
          </div>
        </div>
      </section>
    }

    <section className="homeContactV19">
      <div className="wrap homeContactInnerV19">
        <div className="homeContactCopyV19">
          <span>رابطہ و تعاون</span>
          <h2>مجلس اتحادِ ملت سے رابطہ کریں</h2>
          <p>علمی تعاون، رکنیت، تجاویز یا مجلس سے متعلق کسی بھی رابطے کے لیے ای میل، فون یا واٹس ایپ کے ذریعے ہم سے رابطہ کیا جا سکتا ہے۔</p>
        </div>

        <div className="homeContactCardsV19">
          {c.email&&<a href={`mailto:${c.email}`} className="homeContactCardV19">
            <div><Icon name="mail"/></div>
            <span>ای میل</span>
            <b dir="ltr">{c.email}</b>
          </a>}

          {c.phone&&<a href={`tel:${c.phone.replace(/\s/g,"")}`} className="homeContactCardV19">
            <div><Icon name="phone"/></div>
            <span>رابطہ نمبر</span>
            <b dir="ltr">{c.phone}</b>
          </a>}

          {c.whatsapp&&<a href={whatsappUrl(c.whatsapp)} target="_blank" rel="noreferrer" className="homeContactCardV19 whatsapp">
            <div><Icon name="dialogue"/></div>
            <span>واٹس ایپ</span>
            <b dir="ltr">{c.whatsapp}</b>
          </a>}
        </div>
      </div>
    </section>
  </main>
}
