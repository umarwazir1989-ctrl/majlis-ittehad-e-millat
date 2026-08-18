import Link from "next/link";

const checks=[
  "اردو نستعلیق فونٹ صحیح اور واضح",
  "مینیو overflow نہیں کرتا",
  "Hero heading screen سے باہر نہیں جاتی",
  "CTA buttons آسانی سے tap ہوتے ہیں",
  "Cards ایک دوسرے پر overlap نہیں کرتے",
  "Footer columns موبائل پر ایک column میں",
  "Forms کے inputs zoom/overflow نہیں کرتے"
];

export default function DeviceQaPage(){
  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <h1>Cross-device QA</h1>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="qaIntroV16">
        <span className="eyebrow">Phase 16</span>
        <h2>Android، iPhone، Tablet اور Desktop Preview</h2>
        <p>نیچے responsive frames میں صفحۂ اول کو دیکھیں۔ حتمی منظوری حقیقی device پر بھی ضروری ہے۔</p>
      </div>

      <div className="qaChecklistV16">
        {checks.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b></div>)}
      </div>

      <div className="devicePreviewsV16">
        <section className="deviceFrameWrapV16 phone">
          <div className="deviceLabelV16"><b>Mobile</b><span>390 × 780</span></div>
          <div className="deviceFrameV16"><iframe src="/" title="Mobile homepage preview"/></div>
        </section>

        <section className="deviceFrameWrapV16 tablet">
          <div className="deviceLabelV16"><b>Tablet</b><span>768 × 820</span></div>
          <div className="deviceFrameV16"><iframe src="/" title="Tablet homepage preview"/></div>
        </section>
      </div>

      <div className="qaDesktopLinkV16">
        <a href="/" target="_blank" rel="noreferrer">Desktop preview نئی tab میں کھولیں ↗</a>
      </div>
    </div></section>
  </main>
}
