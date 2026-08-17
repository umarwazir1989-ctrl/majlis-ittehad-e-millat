import type {Metadata} from "next";
import Link from "next/link";import {notFound} from "next/navigation";
import {getPublicActivity} from "../../../lib/content/public";import {siteConfig} from "../../../lib/seo/site";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const a=await getPublicActivity(slug);if(!a)return{};
 return {title:a.title,description:a.excerpt,alternates:{canonical:`/activities/${a.slug}`},
 openGraph:{title:a.title,description:a.excerpt,url:`${siteConfig.url}/activities/${a.slug}`,images:a.image_url?[{url:a.image_url}]:undefined}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=await getPublicActivity(slug);if(!a)notFound();return <main>{a.image_url&&<div className="detailCover activityCover"><img src={a.image_url} alt={a.title}/></div>}<section className="detailHero"><div className="wrap detailHead"><span className="councilBadge">{a.type}</span><h1>{a.title}</h1><div className="detailMeta">{a.date} • {a.location}</div><p>{a.excerpt}</p></div></section><section className="section"><div className="wrap readingLayout"><article className="readingCard">{a.content.map((p,i)=><p key={i}>{p}</p>)}</article><aside className="readingSide"><div className="sideBox"><h3>نوعیت</h3><strong>{a.type}</strong></div><div className="sideBox"><h3>مقام</h3><p>{a.location}</p></div><Link className="sideBack" href="/activities">← تمام سرگرمیاں</Link></aside></div></section></main>}
