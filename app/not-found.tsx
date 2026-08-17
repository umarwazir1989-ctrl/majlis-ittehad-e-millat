import Link from "next/link";

export default function NotFound(){
  return <main className="statePage">
    <div className="stateCard">
      <span className="stateCode">404</span>
      <h1>مطلوبہ صفحہ نہیں ملا</h1>
      <p>ممکن ہے یہ صفحہ منتقل ہو گیا ہو، اس کا پتہ تبدیل ہوا ہو یا لنک درست نہ ہو۔</p>
      <div className="stateActions">
        <Link className="btn" href="/">صفحہ اول پر جائیں</Link>
        <Link className="btn outline" href="/search">تلاش کریں</Link>
      </div>
    </div>
  </main>
}
