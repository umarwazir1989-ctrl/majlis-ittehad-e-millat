import Link from "next/link";

const values=[
["01","قرآن و سنت کی بالادستی","فکر، تحقیق اور رہنمائی میں قرآن و سنت بنیادی معیار رہیں۔"],
["02","علمی دیانت","دلائل، حوالہ جات اور تحقیق میں امانت، توازن اور ذمہ داری۔"],
["03","آدابِ اختلاف","اختلافِ رائے میں تہذیب، احترام، حسنِ ظن اور حسنِ گفتگو۔"],
["04","باہمی احترام","مختلف مکاتبِ فکر اور اہلِ علم کے علمی وقار کا تحفظ۔"]
];
const pillars=[
["داخلی ہم آہنگی","مشترکات کا فروغ، فرقہ وارانہ ذہنیت کی اصلاح اور آدابِ اختلاف کی روایت کی بحالی۔"],
["فکری دفاع","الحاد، دہریت اور جدید فکری یلغار کے مقابلے میں علمی شعور اور تحقیقی تیاری۔"],
["اجتماعی و ملی موقف","اہم قومی اور عالمی مسائل پر متوازن، ذمہ دارانہ اور قریب المتفق رہنمائی۔"]
];
const fields=[
["علمی مکالمہ","اہم علمی و فکری موضوعات پر سنجیدہ اور باوقار گفتگو۔"],
["ملی وحدت","امت کے مشترکہ مسائل میں اتحاد اور یکجہتی کے لیے عملی کوشش۔"],
["تحقیق و فکر","معاصر چیلنجز پر تحقیق، مطالعہ اور علمی مواد کی تیاری۔"],
["مشاورت و تعاون","اہم فیصلوں میں مشاورت اور باہمی تعاون کو فروغ دینا۔"],
["عالمی تناظر","عالمی سطح پر امت کے مسائل اور مواقع پر توجہ۔"]
];
export default function Home(){return <main>
<section className="hero premiumHero"><div className="wrap heroGrid">
<div className="heroCopy"><div className="ornamentTitle"><span></span><b>ایک فکری و علمی پلیٹ فارم</b><span></span></div><h1>فکری ہم آہنگی، علمی مکالمہ<br/>اور ملی وحدت</h1><p>مجلس اتحادِ ملت اہلِ علم، دینی و فکری شخصیات اور اہم اسٹیک ہولڈرز کے لیے ایک ایسا پلیٹ فارم ہے جہاں باہمی احترام، اعتماد اور علمی ترقی کے ماحول کو فروغ دیا جائے۔</p><div className="actions"><Link className="btn" href="/about">مجلس کے بارے میں جانیں</Link><Link className="btn outline" href="/membership">رکنیت اختیار کریں</Link></div></div>
<aside className="quote premiumQuote"><div className="quoteIcon">✦</div><h3>مجلس کا بنیادی پیغام</h3><p>اختلاف باقی رہ سکتا ہے، مگر دلوں میں احترام اور فکری معاملات میں تعاون ہماری مشترکہ ذمہ داری ہے۔</p><div className="quran">وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ</div><small>سورۃ المائدۃ: 2</small></aside>
</div></section>

<section className="fieldStrip"><div className="wrap fieldGrid">{fields.map(([h,p],i)=><article key={h}><div className="fieldIcon">{["◎","◇","▤","⌘","⊕"][i]}</div><h3>{h}</h3><p>{p}</p></article>)}</div></section>

<section className="section aboutPremium"><div className="wrap"><div className="heading fancyHeading"><span className="eyebrow">ہماری پہچان</span><h2>مجلس اتحادِ ملت کیا ہے؟</h2><p>یہ ایک غیر سیاسی، غیر منفعتی اور علمی مجلس ہے جس کا مقصد امتِ مسلمہ کے فکری، دینی اور سماجی مسائل پر غور و فکر اور رہنمائی فراہم کرنا ہے۔</p></div><div className="g3 introCards"><article className="card"><div className="roundIcon">◉</div><h3>ہم کیا ہیں؟</h3><p>علماء، محققین اور دینی و فکری شخصیات پر مشتمل ایک منظم علمی پلیٹ فارم۔</p></article><article className="card"><div className="roundIcon">⊘</div><h3>ہم کیا نہیں ہیں؟</h3><p>کسی سیاسی جماعت، تنظیم یا مسلک کا حصہ نہیں اور نہ کسی گروہ کی نمائندہ جماعت۔</p></article><article className="card"><div className="roundIcon">◎</div><h3>ہمارا مقصد</h3><p>امت کے فکری و اجتماعی مسائل میں ہم آہنگی، علمی ترقی اور مشترکہ اقدام کو فروغ دینا۔</p></article></div></div></section>

<section className="section light valuesSection"><div className="wrap"><div className="heading"><span className="eyebrow">بنیادی اقدار</span><h2>علم، احترام اور ذمہ داری</h2></div><div className="g4 valuePremium">{values.map(([n,h,p])=><article className="card" key={h}><span className="valueNo">{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div></div></section>

<section className="section dark pillarSection"><div className="wrap"><div className="heading"><span className="eyebrow">تین بنیادی ستون</span><h2>مجلس کی فکری سمت</h2><p>علمی مکالمے کو عملی حکمتِ عملی اور اجتماعی ذمہ داری سے جوڑنا۔</p></div><div className="g3 pillarCards">{pillars.map(([h,p],i)=><article className="card" key={h}><span className="pillarNo">0{i+1}</span><h3>{h}</h3><p>{p}</p></article>)}</div><div className="centerAction"><Link className="btn goldBtn" href="/vision">وژن اور اہداف کی تفصیل</Link></div></div></section>

<section className="section nextStep"><div className="wrap"><div className="heading"><span className="eyebrow">تنظیمی تعارف</span><h2>اہلِ علم اور مشاورتی ڈھانچہ</h2><p>مجلس بزرگان اور مجلس مشاورت کے ذریعے علمی رہنمائی، مشاورت اور عملی ترجیحات کی تشکیل۔</p></div><div className="g2"><Link className="bigLink" href="/leadership"><small>علمی رہنمائی</small><h3>مجلس بزرگان</h3><span>تفصیل دیکھیں ←</span></Link><Link className="bigLink" href="/advisory"><small>اجتماعی مشاورت</small><h3>مجلس مشاورت</h3><span>تفصیل دیکھیں ←</span></Link></div></div></section>
</main>}
