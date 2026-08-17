import type {Metadata} from "next";
import Link from "next/link";
import {Noto_Nastaliq_Urdu, Noto_Sans_Arabic} from "next/font/google";
import "./globals.css";
import {siteConfig} from "../lib/seo/site";
import {siteDetails} from "../data/site";
import SiteHeader from "../components/SiteHeader";

const nastaliq=Noto_Nastaliq_Urdu({
  subsets:["arabic"],
  weight:["400","500","600","700"],
  display:"swap",
  variable:"--font-urdu"
});

const arabic=Noto_Sans_Arabic({
  subsets:["arabic"],
  weight:["400","500","600","700"],
  display:"swap",
  variable:"--font-arabic"
});

export const metadata:Metadata={
  metadataBase:new URL(siteConfig.url),
  title:{default:siteConfig.name,template:`%s | ${siteConfig.name}`},
  description:siteConfig.description,
  applicationName:siteConfig.name,
  alternates:{canonical:"/"},
  icons:{icon:"/brand/majlis-logo.svg",shortcut:"/brand/majlis-logo.svg",apple:"/brand/majlis-logo.svg"},
  manifest:"/manifest.webmanifest",
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
  const jsonLd={
    "@context":"https://schema.org",
    "@type":"Organization",
    name:siteDetails.name,
    url:siteConfig.url,
    logo:`${siteConfig.url}/brand/majlis-logo.svg`,
    description:siteDetails.description,
    ...(siteDetails.contact.email?{email:siteDetails.contact.email}:{}),
    ...(siteDetails.contact.phone?{telephone:siteDetails.contact.phone}:{})
  };

  return <html lang="ur" dir="rtl" className={`${nastaliq.variable} ${arabic.variable}`}>
    <body>
      <SiteHeader/>

      <div id="main-content">
        {children}
      </div>

      <footer className="siteFooterV15">
        <div className="wrap footerTopV15">
          <div className="footerBrandV15">
            <div className="footerBrandHeadV15">
              <img src="/brand/majlis-logo.svg" alt="مجلس اتحادِ ملت"/>
              <div>
                <h3>مجلس اتحادِ ملت</h3>
                <span>{siteDetails.tagline}</span>
              </div>
            </div>
            <p>{siteConfig.description}</p>
            <div className="footerSocialV15" aria-label="سوشل میڈیا">
              <span>f</span><span>𝕏</span><span>▶</span><span>◎</span>
            </div>
          </div>

          <div className="footerLinksV15">
            <h4>اہم لنکس</h4>
            <Link href="/">صفحہ اول</Link>
            <Link href="/about">تعارف</Link>
            <Link href="/vision">وژن و اہداف</Link>
            <Link href="/leadership">مجلس بزرگان</Link>
            <Link href="/advisory">مجلس مشاورت</Link>
          </div>

          <div className="footerLinksV15">
            <h4>ہماری خدمات</h4>
            <Link href="/articles">افکار و مباحث</Link>
            <Link href="/activities">سرگرمیاں</Link>
            <Link href="/membership">رکنیت</Link>
            <Link href="/contact">رابطہ</Link>
            <Link href="/search">تلاش</Link>
          </div>

          <div className="footerNewsletterV15">
            <h4>اپ ڈیٹس حاصل کریں</h4>
            <p>مجلس کی تازہ سرگرمیوں اور علمی مواد سے باخبر رہنے کے لیے ہمارے ساتھ جڑے رہیں۔</p>
            <Link className="footerContactBtnV15" href="/contact">رابطہ کریں</Link>
          </div>
        </div>

        <div className="footerBottomV15">
          <div className="wrap">© 2026 مجلس اتحادِ ملت — جملہ حقوق محفوظ ہیں</div>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
    </body>
  </html>
}
