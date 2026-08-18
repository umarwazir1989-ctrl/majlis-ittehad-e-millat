import Link from "next/link";
import {getSiteSettings} from "../../../lib/content/settings";
import {saveSiteSettings} from "./actions";

export default async function SettingsPage({searchParams}:{searchParams:Promise<{saved?:string}>}){
  const query=await searchParams;
  const s=await getSiteSettings();

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <h1>ویب سائٹ سیٹنگز</h1>
    </div></section>

    <section className="section"><div className="wrap">
      {query.saved&&<div className="formSuccess settingsSaved">تبدیلیاں محفوظ ہو گئی ہیں۔</div>}

      <form className="settingsFormV16" action={saveSiteSettings}>
        <section className="settingsPanelV16">
          <div className="settingsPanelHeadV16"><span>01</span><div><h2>برانڈ اور تعارف</h2><p>نام، tagline اور مرکزی description</p></div></div>
          <label>نام<input name="brand_name" required defaultValue={s.brand.name}/></label>
          <label>Tagline<input name="brand_tagline" required defaultValue={s.brand.tagline}/></label>
          <label>مرکزی تعارف<textarea name="brand_description" required defaultValue={s.brand.description}/></label>
        </section>

        <section className="settingsPanelV16">
          <div className="settingsPanelHeadV16"><span>02</span><div><h2>صفحۂ اول</h2><p>Hero، بنیادی پیغام اور CTA</p></div></div>
          <label>اوپری مختصر عنوان<input name="home_kicker" defaultValue={s.home.kicker}/></label>
          <label>مرکزی عنوان<input name="home_title" required defaultValue={s.home.title}/></label>
          <label>مرکزی تعارف<textarea name="home_description" required defaultValue={s.home.description}/></label>
          <div className="settingsGridV16">
            <label>پہلا بٹن<input name="home_primary_label" defaultValue={s.home.primary_label}/></label>
            <label>پہلا URL<input name="home_primary_url" dir="ltr" defaultValue={s.home.primary_url}/></label>
            <label>دوسرا بٹن<input name="home_secondary_label" defaultValue={s.home.secondary_label}/></label>
            <label>دوسرا URL<input name="home_secondary_url" dir="ltr" defaultValue={s.home.secondary_url}/></label>
          </div>
          <label>بنیادی پیغام کا عنوان<input name="home_message_title" defaultValue={s.home.message_title}/></label>
          <label>بنیادی پیغام<textarea name="home_message_text" defaultValue={s.home.message_text}/></label>
          <div className="settingsGridV16">
            <label>آیت / عبارت<input name="home_verse_text" defaultValue={s.home.verse_text}/></label>
            <label>حوالہ<input name="home_verse_reference" defaultValue={s.home.verse_reference}/></label>
          </div>
        </section>

        <section className="settingsPanelV16">
          <div className="settingsPanelHeadV16"><span>03</span><div><h2>بنیادی اقدار</h2><p>صفحۂ اول کی پانچ core values</p></div></div>
          <div className="pillarEditorV16">
            {s.home.pillars.slice(0,5).map((p,i)=><div className="pillarEditV16" key={i}>
              <input type="hidden" name={`pillar_icon_${i}`} value={p.icon}/>
              <b>{String(i+1).padStart(2,"0")}</b>
              <label>عنوان<input name={`pillar_title_${i}`} defaultValue={p.title}/></label>
              <label>مختصر وضاحت<textarea name={`pillar_text_${i}`} defaultValue={p.text}/></label>
            </div>)}
          </div>
        </section>

        <section className="settingsPanelV16">
          <div className="settingsPanelHeadV16"><span>04</span><div><h2>تعارف اور فورمز</h2><p>ہوم پیج کا تعارفی حصہ اور دونوں مجالس</p></div></div>
          <label>تعارف eyebrow<input name="home_about_eyebrow" defaultValue={s.home.about_eyebrow}/></label>
          <label>تعارف عنوان<input name="home_about_title" defaultValue={s.home.about_title}/></label>
          <label>تعارف متن<textarea name="home_about_description" defaultValue={s.home.about_description}/></label>
          <label>فورمز عنوان<input name="home_forums_title" defaultValue={s.home.forums_title}/></label>

          <div className="settingsGridV16">
            <div className="settingsNestedV16">
              <h3>مجلس بزرگان</h3>
              <label>اوپری عنوان<input name="home_elders_eyebrow" defaultValue={s.home.elders_eyebrow}/></label>
              <label>عنوان<input name="home_elders_title" defaultValue={s.home.elders_title}/></label>
              <label>تعارف<textarea name="home_elders_description" defaultValue={s.home.elders_description}/></label>
            </div>
            <div className="settingsNestedV16">
              <h3>مجلس مشاورت</h3>
              <label>اوپری عنوان<input name="home_advisory_eyebrow" defaultValue={s.home.advisory_eyebrow}/></label>
              <label>عنوان<input name="home_advisory_title" defaultValue={s.home.advisory_title}/></label>
              <label>تعارف<textarea name="home_advisory_description" defaultValue={s.home.advisory_description}/></label>
            </div>
          </div>
        </section>

        <section className="settingsPanelV16">
          <div className="settingsPanelHeadV16"><span>05</span><div><h2>رابطہ اور سوشل میڈیا</h2><p>ایک جگہ سے پورے footer/contact کو کنٹرول کریں</p></div></div>
          <div className="settingsGridV16">
            <label>فون<input name="contact_phone" dir="ltr" defaultValue={s.contact.phone}/></label>
            <label>ای میل<input name="contact_email" dir="ltr" type="email" defaultValue={s.contact.email}/></label>
            <label>واٹس ایپ<input name="contact_whatsapp" dir="ltr" defaultValue={s.contact.whatsapp}/></label>
            <label>دفتر<input name="contact_office" defaultValue={s.contact.office}/></label>
            <label>Facebook<input name="social_facebook" dir="ltr" defaultValue={s.social.facebook}/></label>
            <label>YouTube<input name="social_youtube" dir="ltr" defaultValue={s.social.youtube}/></label>
            <label>X / Twitter<input name="social_x" dir="ltr" defaultValue={s.social.x}/></label>
            <label>Instagram<input name="social_instagram" dir="ltr" defaultValue={s.social.instagram}/></label>
          </div>
        </section>

        <section className="settingsPanelV16">
          <div className="settingsPanelHeadV16"><span>06</span><div><h2>Footer / Newsletter</h2><p>Footer کے آخری حصے کی عبارت</p></div></div>
          <label>Newsletter عنوان<input name="footer_newsletter_title" defaultValue={s.footer.newsletter_title}/></label>
          <label>Newsletter متن<textarea name="footer_newsletter_text" defaultValue={s.footer.newsletter_text}/></label>
          <label>Copyright<input name="footer_copyright" defaultValue={s.footer.copyright}/></label>
        </section>

        <div className="settingsSaveBarV16">
          <span>تبدیلیاں پورے public website پر لاگو ہوں گی۔</span>
          <button className="btn">تمام سیٹنگز محفوظ کریں</button>
        </div>
      </form>
    </div></section>
  </main>
}
