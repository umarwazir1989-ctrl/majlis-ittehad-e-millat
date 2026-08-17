import type {Metadata} from "next";
import Link from "next/link";
import "./globals.css";
import {siteConfig} from "../lib/seo/site";

export const metadata:Metadata={
  metadataBase:new URL(siteConfig.url),
  title:{default:siteConfig.name,template:`%s | ${siteConfig.name}`},
  description:siteConfig.description,
  applicationName:siteConfig.name,
  alternates:{canonical:"/"},
  openGraph:{
    type:"website",
    locale:"ur_PK",
    url:siteConfig.url,
    siteName:siteConfig.name,
    title:siteConfig.name,
    description:siteConfig.description
  },
  twitter:{card:"summary_large_image",title:siteConfig.name,description:siteConfig.description},
  robots:{index:true,follow:true}
};

const nav=[["تعارف","/about"],["وژن و اہداف","/vision"],["مجلس بزرگان","/leadership"],["مجلس مشاورت","/advisory"],["مضامین","/articles"],["سرگرمیاں","/activities"],["تلاش","/search"],["رکنیت","/membership"]];

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ur" dir="rtl"><body>
    <div className="top">اختلاف میں احترام • مشترکات میں تعاون • ملی مسائل میں ذمہ دارانہ رہنمائی</div>
    <header><div className="wrap head">
      <Link className="brand" href="/"><b className="logo">م</b><span><strong>مجلس اتحادِ ملت</strong><small>علمی و مشاورتی پلیٹ فارم</small></span></Link>
      <nav>{nav.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}<Link className="cta" href="/contact">رابطہ</Link></nav>
    </div></header>
    {children}
    <footer><div className="wrap foot"><div><h3>مجلس اتحادِ ملت</h3><p>{siteConfig.description}</p></div>
      <div><h4>اہم روابط</h4><Link href="/about">تعارف</Link><Link href="/vision">وژن و اہداف</Link><Link href="/leadership">مجلس بزرگان</Link><Link href="/search">تلاش</Link></div>
      <div><h4>مزید</h4><Link href="/membership">رکنیت</Link><Link href="/contact">رابطہ</Link><Link href="/activities">سرگرمیاں</Link></div>
    </div><div className="copy">© 2026 مجلس اتحادِ ملت</div></footer>
  </body></html>
}
