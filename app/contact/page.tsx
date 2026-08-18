import Link from "next/link";
import {submitMessage} from "./actions";
import {displayOrPending} from "../../data/site";
import {getSiteSettings} from "../../lib/content/settings";

export const dynamic="force-dynamic";
export const metadata={title:"رابطہ",description:"مجلس اتحادِ ملت سے رابطہ کریں، سوال یا تجویز بھیجیں۔"};

export default async function Page({searchParams}:{searchParams:Promise<{success?:string;error?:string}>}){
  const [q,s]=await Promise.all([searchParams,getSiteSettings()]);
  const c=s.contact;

  return <main>
    <section className="pageHero formHero contactHero"><div className="wrap">
      <span className="eyebrow">ہم سے بات کریں</span><h1>رابطہ</h1>
      <p>سوال، تجویز، علمی تعاون یا مجلس سے متعلق رابطے کے لیے پیغام بھیجیں۔</p>
    </div></section>

    <section className="section"><div className="wrap"><div className="g2 contactGrid">
      <article className="contactInfoCard">
        <span className="eyebrow">رابطہ معلومات</span>
        <h2>{s.brand.name}</h2>
        <p>یہ معلومات Admin → ویب سائٹ سیٹنگز سے تبدیل کی جا سکتی ہیں۔</p>
        <div className="contactLine"><b>فون</b><span>{displayOrPending(c.phone)}</span></div>
        <div className="contactLine"><b>ای میل</b><span>{displayOrPending(c.email)}</span></div>
        <div className="contactLine"><b>دفتر</b><span>{displayOrPending(c.office)}</span></div>
        <div className="contactLine"><b>واٹس ایپ</b><span>{displayOrPending(c.whatsapp)}</span></div>
      </article>

      <form className="publicForm contactForm" action={submitMessage}>
        <input className="hpField" name="website" tabIndex={-1} autoComplete="off"/>
        {q.success&&<div className="formSuccess">آپ کا پیغام کامیابی سے موصول ہو گیا ہے۔</div>}
        {q.error&&<div className="formError">پیغام محفوظ نہیں ہو سکا۔ معلومات چیک کرکے دوبارہ کوشش کریں۔</div>}
        <label>نام<input name="name" required minLength={2} maxLength={120}/></label>
        <div className="g2"><label>ای میل<input type="email" name="email" required maxLength={160}/></label><label>فون<input name="phone" maxLength={30}/></label></div>
        <label>موضوع<input name="subject" required minLength={3} maxLength={180}/></label>
        <label>پیغام<textarea name="message" required minLength={10} maxLength={5000}/></label>
        <button className="btn">پیغام بھیجیں</button>
      </form>
    </div></div></section>

    <div className="wrap"><Link className="back" href="/">← صفحۂ اول</Link></div>
  </main>
}
