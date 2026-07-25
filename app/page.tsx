import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faScaleBalanced,
  faPeopleGroup,
  faHandshake,
  faArrowLeft,
  faQuoteRight,
  faCalendarDays,
  faFileLines,
  faVideo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const values = [
  { icon: faBookOpen, title: "قرآن و سنت کی بالادستی", text: "تمام علمی و فکری سرگرمیوں میں قرآن و سنت کو بنیادی رہنما سمجھنا۔" },
  { icon: faScaleBalanced, title: "علمی دیانت", text: "دلائل، حوالہ جات اور تحقیق میں ذمہ داری، امانت اور توازن۔" },
  { icon: faHandshake, title: "آدابِ اختلاف", text: "اختلافِ رائے میں تہذیب، احترام اور حسنِ گفتگو کو قائم رکھنا۔" },
  { icon: faPeopleGroup, title: "باہمی احترام", text: "مختلف مکاتبِ فکر، علماء اور شخصیات کے علمی وقار کا تحفظ۔" },
];

const leaders = [
  { name: "ڈاکٹر حافظ عبدالرحمن مدنی", role: "مجلس بزرگان", initials: "ع م" },
  { name: "ڈاکٹر صاحبزادہ جبار الرحمن صدیقی", role: "مجلس بزرگان", initials: "ج ص" },
  { name: "مولانا زاہد الراشدی", role: "مجلس بزرگان", initials: "ز ر" },
  { name: "پروفیسر ڈاکٹر قبلہ ایاز", role: "مجلس بزرگان", initials: "ق ا" },
  { name: "سید ضیاء اللہ شاہ بخاری", role: "مجلس مشاورت", initials: "ض ب" },
  { name: "قاضی عبد القدیر خاموش", role: "مجلس مشاورت", initials: "ع خ" },
];

const posts = [
  { type: "مضمون", title: "اختلاف کو تصادم نہیں، مکالمہ بنائیں", date: "24 جولائی 2026", icon: faFileLines },
  { type: "سرگرمی", title: "بین المسالک علمی نشست کا انعقاد", date: "20 جولائی 2026", icon: faCalendarDays },
  { type: "ویڈیو", title: "اتحادِ امت: ضرورت، حدود اور امکانات", date: "18 جولائی 2026", icon: faVideo },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <div className="logo-mark">م</div>
            <div>
              <h1>مجلس اتحادِ ملت</h1>
              <p>اختلاف میں احترام، مشترکات میں تعاون</p>
            </div>
          </div>
          <nav>
            <a href="#about">تعارف</a>
            <a href="#vision">وژن</a>
            <a href="#structure">تنظیمی ڈھانچہ</a>
            <a href="#activities">سرگرمیاں</a>
            <a href="#contact" className="nav-cta">رابطہ</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-pattern" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">ایک مشترکہ علمی و مشاورتی پلیٹ فارم</span>
            <h2>فکری ہم آہنگی، علمی مکالمہ اور ملی وحدت</h2>
            <p>
              مختلف مکاتبِ فکر کے اہلِ علم، دانشور اور قومی شخصیات مشترکہ مسائل کے حل،
              باہمی احترام اور امت کی اجتماعی رہنمائی کے لیے ایک جگہ جمع ہوں۔
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#about">مجلس کا تعارف <FontAwesomeIcon icon={faArrowLeft} /></a>
              <a className="btn ghost" href="#membership">رکنیت حاصل کریں</a>
            </div>
          </div>
          <div className="hero-card">
            <FontAwesomeIcon icon={faQuoteRight} />
            <blockquote>
              “اختلاف باقی رہ سکتا ہے، مگر دلوں میں احترام اور قومی معاملات میں تعاون باقی رہنا چاہیے۔”
            </blockquote>
            <span>مجلس اتحادِ ملت کا بنیادی پیغام</span>
          </div>
        </div>
      </section>

      <section id="about" className="section light">
        <div className="container">
          <div className="section-heading">
            <span>ہماری پہچان</span>
            <h3>مجلس اتحادِ ملت کیا ہے؟</h3>
            <p>یہ کسی نئے مسلک یا سیاسی اتحاد کا نام نہیں، بلکہ علمی رابطے اور مشترکہ قومی مسائل پر تعاون کا پلیٹ فارم ہے۔</p>
          </div>
          <div className="two-cards">
            <article className="info-card positive">
              <h4>ہم کیا ہیں؟</h4>
              <p>علماء، مفکرین اور ماہرین کے درمیان مہذب مکالمے، علمی تعاون اور مشترکہ رہنمائی کا منظم فورم۔</p>
            </article>
            <article className="info-card negative">
              <h4>ہم کیا نہیں ہیں؟</h4>
              <p>نیا فرقہ، مسلک، سیاسی جماعت، انتخابی اتحاد یا کسی ایک گروہ کی نمائندہ تنظیم نہیں۔</p>
            </article>
          </div>
        </div>
      </section>

      <section id="vision" className="section">
        <div className="container">
          <div className="section-heading compact">
            <span>بنیادی اقدار</span>
            <h3>علم، احترام اور تعاون</h3>
          </div>
          <div className="value-grid">
            {values.map((item) => (
              <article className="value-card" key={item.title}>
                <div className="icon-box"><FontAwesomeIcon icon={item.icon} /></div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>



      <section className="section light">
        <div className="container">
          <div className="section-heading compact">
            <span>دورِ حاضر کے چیلنجز</span>
            <h3>وہ مسائل جن کے جواب میں مجلس کی ضرورت ہے</h3>
          </div>
          <div className="value-grid">
            <article className="value-card"><h4>فکری یلغار</h4><p>خارجی فکری خطرات، شکوک اور دینی شناخت کو درپیش نئے چیلنجز۔</p></article>
            <article className="value-card"><h4>داخلی اختلافات</h4><p>فکری و مسلکی تنوع میں شدت، باہمی اعتماد کا فقدان اور مشترکہ مسائل پر منتشر آوازیں۔</p></article>
            <article className="value-card"><h4>نسلی و لسانی تقسیم</h4><p>قومی سطح پر فاصلوں، تعصبات اور باہمی بداعتمادی کے رجحانات۔</p></article>
            <article className="value-card"><h4>امت کے مشترکہ مسائل</h4><p>قومی اور عالمی مسائل پر متوازن، بروقت اور مشترکہ موقف کی ضرورت۔</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading compact">
            <span>تین بنیادی ستون</span>
            <h3>مجلس کی فکری سمت</h3>
          </div>
          <div className="two-cards">
            <article className="info-card positive"><h4>داخلی ہم آہنگی</h4><p>مسلم مکاتبِ فکر کے درمیان مشترکات کا فروغ، فرقہ وارانہ ذہنیت کی اصلاح اور آدابِ اختلاف کا شعور۔</p></article>
            <article className="info-card positive"><h4>فکری دفاع</h4><p>دینی ترجیحات کی درست ترتیب اور الحاد، دہریت اور فکری یلغار کے مقابلے کے لیے علمی شعور۔</p></article>
          </div>
          <div className="two-cards" style={{marginTop: "1.2rem"}}>
            <article className="info-card positive"><h4>اجتماعی و ملی موقف</h4><p>اہم قومی اور عالمی مسائل پر متوازن، قریب المتفق اور ذمہ دارانہ موقف کی تیاری۔</p></article>
            <article className="info-card positive"><h4>عملی حکمتِ عملی</h4><p>تعلیمی اداروں، میڈیا، مکالمے اور سماجی امن کے ذریعے مشترکہ فکری سفر کو عملی شکل دینا۔</p></article>
          </div>
        </div>
      </section>

      <section id="structure" className="section dark">
        <div className="container structure-grid">
          <div>
            <span className="eyebrow muted">تنظیمی ڈھانچہ</span>
            <h3>مشاورت سے عمل تک</h3>
            <p>مجلس کا نظام علمی وقار، اجتماعی مشاورت، واضح ذمہ داری اور منظم عملی اقدامات پر قائم ہوگا۔</p>
          </div>
          <div className="steps">
            {["مجلس بزرگان", "مجلس مشاورت", "انتظامی عہدیداران", "مجلس ارکان"].map((step, index) => (
              <div className="step" key={step}><span>{index + 1}</span><strong>{step}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div className="section-heading row-heading">
            <div><span>نمائندہ شخصیات</span><h3>مجلس کے ذمہ داران</h3></div>
            <a href="#">تمام شخصیات دیکھیں <FontAwesomeIcon icon={faArrowLeft} /></a>
          </div>
          <div className="leader-grid">
            {leaders.map((leader) => (
              <article className="leader-card" key={leader.name}>
                <div className="avatar">{leader.initials}</div>
                <h4>{leader.name}</h4>
                <p>{leader.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="activities" className="section">
        <div className="container">
          <div className="section-heading row-heading">
            <div><span>تازہ مواد</span><h3>مضامین اور سرگرمیاں</h3></div>
            <a href="#">تمام مواد دیکھیں <FontAwesomeIcon icon={faArrowLeft} /></a>
          </div>
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.title}>
                <div className="post-icon"><FontAwesomeIcon icon={post.icon} /></div>
                <span>{post.type}</span>
                <h4>{post.title}</h4>
                <p>{post.date}</p>
                <a href="#">مزید پڑھیں <FontAwesomeIcon icon={faArrowLeft} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="cta-section">
        <div className="container cta-inner">
          <div>
            <span>علمی و قومی خدمت میں شریک ہوں</span>
            <h3>مجلس اتحادِ ملت کے رکن بنیں</h3>
            <p>علماء، محققین، اساتذہ، ماہرین اور اداروں کے لیے رکنیت کے مختلف درجات دستیاب ہیں۔</p>
          </div>
          <a className="btn light-btn" href="#contact">رکنیت فارم کھولیں</a>
        </div>
      </section>

      <footer id="contact">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand"><div className="logo-mark">م</div><div><h1>مجلس اتحادِ ملت</h1><p>اختلاف میں احترام، مشترکات میں تعاون</p></div></div>
            <p className="footer-note">یہ تمام رابطہ معلومات فی الحال نمونہ کے طور پر شامل کی گئی ہیں۔</p>
          </div>
          <div><h4>فوری روابط</h4><a href="#about">تعارف</a><a href="#vision">وژن</a><a href="#activities">سرگرمیاں</a></div>
          <div><h4>رابطہ</h4><p><FontAwesomeIcon icon={faEnvelope} /> info@ittehadmillat.example</p><p>لاہور، پاکستان</p><p>+92 300 0000000</p></div>
        </div>
        <div className="copyright">© 2026 مجلس اتحادِ ملت — جملہ حقوق محفوظ ہیں</div>
      </footer>
    </main>
  );
}
