import type {Metadata} from "next";
import Link from "next/link";import {notFound} from "next/navigation";
import {getPublicPerson} from "../../../lib/content/public";import {siteConfig} from "../../../lib/seo/site";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=await getPublicPerson(slug);if(!p)return{};
 return {title:p.name,description:p.summary,alternates:{canonical:`/people/${p.slug}`},
 openGraph:{title:p.name,description:p.summary,url:`${siteConfig.url}/people/${p.slug}`,images:p.image_url?[{url:p.image_url}]:undefined}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=await getPublicPerson(slug);if(!p)notFound();return <main><section className="profileHero"><div className="wrap profileHeroGrid">{p.image_url?<img className="largeProfilePhoto" src={p.image_url} alt={p.name}/>:<div className="largeAvatar">{p.initials}</div>}<div><span className="councilBadge">{p.council}</span><h1>{p.name}</h1><p className="profileRole">{p.designation}</p><p>{p.summary}</p></div></div></section><section className="section"><div className="wrap profileLayout"><article className="profileMain"><span className="eyebrow">تعارف</span><h2>علمی و مشاورتی پروفائل</h2>{p.bio.length?p.bio.map((x,i)=><p key={i}>{x}</p>):<p>تفصیلی تعارف بعد میں شامل ہوگا۔</p>}</article><aside className="profileSide"><div className="sideBox"><h3>مجلس میں حیثیت</h3><strong>{p.council}</strong><p>{p.designation}</p></div></aside></div></section><div className="wrap profileBack"><Link href={p.council==="مجلس بزرگان"?"/leadership":"/advisory"}>← متعلقہ مجلس پر واپس جائیں</Link></div></main>}
