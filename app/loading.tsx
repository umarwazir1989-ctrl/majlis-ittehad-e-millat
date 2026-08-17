export default function Loading(){
  return <div className="pageLoading" aria-live="polite" aria-label="صفحہ لوڈ ہو رہا ہے">
    <div className="loadingBar"></div>
    <div className="wrap loadingShell">
      <div className="skeleton skTitle"></div>
      <div className="skeleton skText"></div>
      <div className="skeleton skText short"></div>
      <div className="loadingCards">
        <div className="skeleton skCard"></div>
        <div className="skeleton skCard"></div>
        <div className="skeleton skCard"></div>
      </div>
    </div>
  </div>
}
