import type {Metadata} from "next";
import Link from "next/link";
import "./globals.css";
import {siteConfig} from "../lib/seo/site";
import SiteHeader from "../components/SiteHeader";

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

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ur" dir="rtl"><body>
    <SiteHeader/>

    <div id="main-content">
      {children}
    </div>

    <footer>
      <div className="wrap foot footV11">
        <div className="footerBrand">
          <div className="footerBrandHead"><span className="footerMark">م</span><h3>مجلس اتحادِ ملت</h3></div>
          <p>{siteConfig.description}</p>
        </div>

        <div>
          <h4>اہم روابط</h4>
          <Link href="/">صفحہ اول</Link>
          <Link href="/about">تعارف</Link>
          <Link href="/vision">وژن و اہداف</Link>
          <Link href="/leadership">مجلس بزرگان</Link>
          <Link href="/advisory">مجلس مشاورت</Link>
        </div>

        <div>
          <h4>مزید</h4>
          <Link href="/articles">مضامین</Link>
          <Link href="/activities">سرگرمیاں</Link>
          <Link href="/membership">رکنیت</Link>
          <Link href="/contact">رابطہ</Link>
          <Link href="/search">تلاش</Link>
        </div>
      </div>
      <div className="copy">© 2026 مجلس اتحادِ ملت — جملہ حقوق محفوظ ہیں</div>
    </footer>
  </body></html>
}
