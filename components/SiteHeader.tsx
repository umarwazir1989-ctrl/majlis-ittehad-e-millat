"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";

const nav=[
  ["صفحہ اول","/"],
  ["مجلس کا تعارف","/about"],
  ["وژن و اہداف","/vision"],
  ["مجلس بزرگان","/leadership"],
  ["مجلس مشاورت","/advisory"],
  ["افکار و مباحث","/articles"],
  ["سرگرمیاں","/activities"],
];

export default function SiteHeader(){
  const pathname=usePathname();
  const [open,setOpen]=useState(false);

  useEffect(()=>{setOpen(false)},[pathname]);
  useEffect(()=>{
    document.body.style.overflow=open?"hidden":"";
    return ()=>{document.body.style.overflow=""};
  },[open]);

  const active=(href:string)=>href==="/"?pathname==="/":pathname.startsWith(href);

  return <>
    <a className="skipLink" href="#main-content">مرکزی مواد پر جائیں</a>

    <header className="proHeaderV15">
      <div className="wrap proHeadInnerV15">
        <Link className="proBrandV15" href="/" aria-label="مجلس اتحادِ ملت — صفحہ اول">
          <img src="/brand/majlis-logo.svg" alt="" aria-hidden="true"/>
          <span>
            <strong>مجلس اتحادِ ملت</strong>
            <small>فکر میں ہم آہنگی، عمل میں وحدت</small>
          </span>
        </Link>

        <nav className="proDesktopNavV15" aria-label="مرکزی مینیو">
          {nav.map(([name,href])=>
            <Link className={active(href)?"active":""} key={href} href={href}>{name}</Link>
          )}
        </nav>

        <div className="proActionsV15">
          <Link className="proSearchV15" href="/search" aria-label="تلاش">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>
          </Link>
          <Link className="proCtaV15" href="/membership">رکنیت اختیار کریں</Link>
          <button type="button" className="proMenuBtnV15" aria-expanded={open} aria-label={open?"مینیو بند کریں":"مینیو کھولیں"} onClick={()=>setOpen(v=>!v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    {open&&<div className="mobileOverlay" onClick={()=>setOpen(false)} aria-hidden="true"></div>}
    <aside className={`proMobileMenuV15 ${open?"open":""}`} aria-hidden={!open}>
      <div className="proMobileHeadV15">
        <div className="proMobileBrandV15">
          <img src="/brand/majlis-logo.svg" alt=""/>
          <span><strong>مجلس اتحادِ ملت</strong><small>مرکزی مینیو</small></span>
        </div>
        <button type="button" onClick={()=>setOpen(false)} aria-label="مینیو بند کریں">×</button>
      </div>
      <div className="proMobileLinksV15">
        {nav.map(([name,href])=>
          <Link className={active(href)?"active":""} key={href} href={href}><span>{name}</span><b>←</b></Link>
        )}
        <Link href="/search"><span>تلاش</span><b>←</b></Link>
        <Link href="/contact"><span>ہم سے رابطہ کریں</span><b>←</b></Link>
        <Link className="proMobileCtaV15" href="/membership">رکنیت اختیار کریں</Link>
      </div>
    </aside>
  </>
}
