import Link from "next/link";

export default function ExportPage(){
  return <main className="adminPage">
    <section className="adminSubHero"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <h1>Backup / Export</h1>
    </div></section>
    <section className="section"><div className="wrap">
      <div className="exportCard">
        <span className="eyebrow">JSON Backup</span>
        <h2>ویب سائٹ کا موجودہ database content محفوظ کریں</h2>
        <p>یہ export مضامین، سرگرمیاں، شخصیات، site pages، رکنیت درخواستیں اور رابطہ پیغامات کو ایک JSON backup میں فراہم کرے گا۔</p>
        <a className="btn" href="/api/admin/export">JSON Backup Download</a>
      </div>
    </div></section>
  </main>
}
