import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";

const expectedElders=[
  "ڈاکٹر حافظ عبدالرحمن مدنی",
  "ڈاکٹر صاحبزادہ جبار الرحمن صدیقی",
  "مولانا زاہد الراشدی",
  "پروفیسر ڈاکٹر قبلہ ایاز",
  "احمد جاوید"
];

const expectedAdvisory=[
  "سید ضیاء اللہ شاہ بخاری",
  "قاضی عبد القدیر خاموش",
  "مفتی محمد زبیر",
  "مفتی گلزار نعیمی",
  "مفتی شہزاد احمد علوی",
  "صاحبزادہ محمد امانت رسول"
];

export default async function MigrationPage(){
  const supabase=await createClient();
  const {data:people}=await supabase.from("people").select("name,council");
  const names=new Set((people||[]).map(x=>x.name));

  const elderDone=expectedElders.filter(x=>names.has(x)).length;
  const advisoryDone=expectedAdvisory.filter(x=>names.has(x)).length;

  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <h1>Source Data Migration</h1>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="migrationSummary">
        <div><strong>{elderDone}/{expectedElders.length}</strong><span>مجلس بزرگان</span></div>
        <div><strong>{advisoryDone}/{expectedAdvisory.length}</strong><span>مجلس مشاورت</span></div>
        <div><strong>2</strong><span>بنیادی صفحات</span></div>
      </div>

      <div className="g2 migrationLists">
        <div className="migrationPanel"><h2>مجلس بزرگان</h2>
          {expectedElders.map(name=><div className="migrationPerson" key={name}><span>{name}</span><b className={names.has(name)?"done":"pending"}>{names.has(name)?"موجود":"Seed باقی"}</b></div>)}
        </div>
        <div className="migrationPanel"><h2>مجلس مشاورت</h2>
          {expectedAdvisory.map(name=><div className="migrationPerson" key={name}><span>{name}</span><b className={names.has(name)?"done":"pending"}>{names.has(name)?"موجود":"Seed باقی"}</b></div>)}
        </div>
      </div>

      <div className="sourceIntegrityNote">
        فراہم کردہ مواد میں مکمل شائع شدہ مضامین اور حقیقی سرگرمیوں کا ایسا جامع متن موجود نہیں جسے بلا تصدیق public content کے طور پر migrate کیا جا سکے؛ اس لیے Phase 13 میں فرضی مضامین یا پروگرام database میں seed نہیں کیے گئے۔
      </div>
    </div></section>
  </main>
}
