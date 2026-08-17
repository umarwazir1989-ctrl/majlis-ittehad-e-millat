"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";

const nav=[
  ["صفحہ اول","/"],
  ["تعارف","/about"],
  ["وژن و اہداف","/vision"],
  ["مجلس بزرگان","/leadership"],
  ["مجلس مشاورت","/advisory"],
  ["مضامین","/articles"],
  ["سرگرمیاں","/activities"],
  ["تلاش","/search"],
  ["رکنیت","/membership"],
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

    <div className="top">
      اختلاف میں احترام • مشترکات میں تعاون • ملی مسائل میں ذمہ دارانہ رہنمائی
    </div>

    <header className="siteHeader">
      <div className="wrap headV11">
        <Link className="brand brandV11" href="/" aria-label="مجلس اتحادِ ملت — صفحہ اول">
          <span className="brandMark" aria-hidden="true"><b>م</b></span>
          <span className="brandText">
            <strong>مجلس اتحادِ ملت</strong>
            <small>علمی و مشاورتی پلیٹ فارم</small>
          </span>
        </Link>

        <nav className="desktopNav" aria-label="مرکزی مینیو">
          {nav.map(([name,href])=>
            <Link className={active(href)?"active":""} key={href} href={href}>{name}</Link>
          )}
        </nav>

        <div className="headerActions">
          <Link className="headerSearch" href="/search" aria-label="تلاش">⌕</Link>
          <Link className="cta headerCta" href="/contact">ہم سے رابطہ کریں</Link>
          <button
            type="button"
            className="menuButton"
            aria-label={open?"مینیو بند کریں":"مینیو کھولیں"}
            aria-expanded={open}
            onClick={()=>setOpen(v=>!v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    {open&&<div className="mobileOverlay" onClick={()=>setOpen(false)} aria-hidden="true"></div>}
    <aside className={`mobileMenu ${open?"open":""}`} aria-hidden={!open}>
      <div className="mobileMenuHead">
        <div>
          <strong>مجلس اتحادِ ملت</strong>
          <small>مرکزی مینیو</small>
        </div>
        <button type="button" onClick={()=>setOpen(false)} aria-label="مینیو بند کریں">×</button>
      </div>

      <div className="mobileNav" role="navigation" aria-label="موبائل مینیو">
        {nav.map(([name,href])=>
          <Link className={active(href)?"active":""} key={href} href={href}>
            <span>{name}</span><b>←</b>
          </Link>
        )}
        <Link className="mobileContact" href="/contact">ہم سے رابطہ کریں</Link>
      </div>
    </aside>
  </>
}
