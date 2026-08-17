import Link from "next/link";import {submitMembership} from "./actions";
export const metadata={title:"رکنیت",description:"مجلس اتحادِ ملت سے وابستگی کے لیے رکنیت کی درخواست جمع کریں۔"};
export default async function Page({searchParams}:{searchParams:Promise<{success?:string;error?:string}>}){const q=await searchParams;return <main>
<section className="pageHero formHero"><div className="wrap"><span className="eyebrow">مجلس سے وابستگی</span><h1>رکنیت کی درخواست</h1><p>علمی، فکری اور ملی مقاصد میں تعاون کے خواہش مند افراد اپنی بنیادی معلومات جمع کرا سکتے ہیں۔</p></div></section>
<section className="section"><div className="wrap"><div className="publicFormShell"><div className="publicFormIntro"><span className="eyebrow">درخواست</span><h2>مجلس سے وابستہ ہوں</h2><p>فارم جمع کرنا خودکار طور پر رکنیت کی منظوری نہیں ہے۔</p></div>
<form className="publicForm" action={submitMembership}><input className="hpField" name="website" tabIndex={-1} autoComplete="off"/>
{q.success&&<div className="formSuccess">آپ کی درخواست کامیابی سے موصول ہو گئی ہے۔</div>}{q.error&&<div className="formError">درخواست محفوظ نہیں ہو سکی۔ معلومات چیک کرکے دوبارہ کوشش کریں۔</div>}
<label>مکمل نام<input name="full_name" required minLength={2} maxLength={120}/></label><div className="g2"><label>موبائل نمبر<input name="phone" required minLength={7} maxLength={30}/></label><label>ای میل<input name="email" type="email" maxLength={160}/></label></div>
<div className="g2"><label>شہر<input name="city" required maxLength={100}/></label><label>شعبہ / تخصص<select name="profession" defaultValue="" required><option value="" disabled>منتخب کریں</option><option>عالمِ دین</option><option>محقق / استاد</option><option>دانشور / ماہر</option><option>طالب علم</option><option>دیگر</option></select></label></div>
<label>مختصر تعارف<textarea name="introduction" required minLength={5} maxLength={1500}/></label><button className="btn">درخواست جمع کریں</button></form></div></div></section>
<div className="wrap"><Link className="back" href="/">← صفحۂ اول</Link></div></main>}
