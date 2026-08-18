import type {Metadata} from "next";
import Link from "next/link";
import {Noto_Nastaliq_Urdu,Noto_Sans_Arabic} from "next/font/google";
import "./globals.css";
import {siteConfig} from "../lib/seo/site";
import {getSiteSettings} from "../lib/content/settings";
import SiteHeader from "../components/SiteHeader";
import NewsletterForm from "../components/NewsletterForm";
import AnalyticsTracker from "../components/AnalyticsTracker";

const nastaliq=Noto_Nastaliq_Urdu({
  subsets:["arabic"],weight:["400","500","600","700"],display:"swap",variable:"--font-urdu"
});
const arabic=Noto_Sans_Arabic({
  subsets:["arabic"],weight:["400","500","600","700"],display:"swap",variable:"--font-arabic"
});

export const metadata:Metadata={
  metadataBase:new URL(siteConfig.url),
  title:{default:siteConfig.name,template:`%s | ${siteConfig.name}`},
  description:siteConfig.description,
  applicationName:siteConfig.name,
  alternates:{canonical:"/"},
  icons:{icon:"/brand/majlis-logo.svg",shortcut:"/brand/majlis-logo.svg",apple:"/brand/majlis-logo.svg"},
  manifest:"/manifest.webmanifest",
  openGraph:{type:"website",locale:"ur_PK",url:siteConfig.url,siteName:siteConfig.name,title:siteConfig.name,description:siteConfig.description},
  twitter:{card:"summary_large_image",title:siteConfig.name,description:siteConfig.description},
  robots:{index:true,follow:true}
};

export default async function RootLayout({children}:{children:React.ReactNode}){
  const s=await getSiteSettings();
  const social=[
    ["f",s.social.facebook,"Facebook"],
    ["𝕏",s.social.x,"X"],
    ["▶",s.social.youtube,"YouTube"],
    ["◎",s.social.instagram,"Instagram"]
  ].filter(([,url])=>Boolean(url));

  const jsonLd={
    "@context":"https://schema.org","@type":"Organization",
    name:s.brand.name,url:siteConfig.url,logo:`${siteConfig.url}/brand/majlis-logo.svg`,
    description:s.brand.description,
    ...(s.contact.email?{email:s.contact.email}:{}),
    ...(s.contact.phone?{telephone:s.contact.phone}:{})
  };

  return <html lang="ur" dir="rtl" className={`${nastaliq.variable} ${arabic.variable}`}>
    <body>
      <SiteHeader/>
      <AnalyticsTracker/>
      <div id="main-content">{children}</div>

      <footer className="siteFooterV15">
        <div className="wrap footerTopV15">
          <div className="footerBrandV15">
            <div className="footerBrandHeadV15">
              <img src="/brand/majlis-logo.svg" alt={s.brand.name}/>
              <div><h3>{s.brand.name}</h3><span>{s.brand.tagline}</span></div>
            </div>
            <p>{s.brand.description}</p>
            {social.length>0&&<div className="footerSocialV15" aria-label="سوشل میڈیا">
              {social.map(([icon,url,label])=><a key={String(label)} href={String(url)} target="_blank" rel="noreferrer" aria-label={String(label)}>{icon}</a>)}
            </div>}
          </div>

          <div className="footerLinksV15">
            <h4>اہم لنکس</h4>
            <Link href="/">صفحہ اول</Link><Link href="/about">تعارف</Link><Link href="/vision">وژن و اہداف</Link>
            <Link href="/leadership">مجلس بزرگان</Link><Link href="/advisory">مجلس مشاورت</Link>
          </div>

          <div className="footerLinksV15">
            <h4>ہماری خدمات</h4>
            <Link href="/articles">افکار و مباحث</Link><Link href="/activities">سرگرمیاں</Link>
            <Link href="/membership">رکنیت</Link><Link href="/contact">رابطہ</Link><Link href="/search">تلاش</Link>
          </div>

          <div className="footerNewsletterV15" id="footer-newsletter">
            <h4>{s.footer.newsletter_title}</h4>
            <p>{s.footer.newsletter_text}</p>
            <NewsletterForm/>
          </div>
        </div>
        <div className="footerBottomV15"><div className="wrap">{s.footer.copyright}</div></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
    </body>
  </html>
}
