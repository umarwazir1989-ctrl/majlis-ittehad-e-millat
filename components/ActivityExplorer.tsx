"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import type {PublicActivity} from "../lib/content/public";
export default function ActivityExplorer({activities}:{activities:PublicActivity[]}){
 const types=["تمام",...Array.from(new Set(activities.map(x=>x.type)))];const [query,setQuery]=useState("");const [type,setType]=useState("تمام");
 const filtered=useMemo(()=>activities.filter(a=>{const q=query.trim().toLowerCase();return(type==="تمام"||a.type===type)&&(!q||[a.title,a.type,a.location,a.excerpt].join(" ").toLowerCase().includes(q))}),[activities,query,type]);
 return <div><div className="liveToolbar"><div className="liveSearch"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="سرگرمی، مقام یا نوعیت تلاش کریں"/></div><div className="filterCount">{filtered.length} نتائج</div></div><div className="categoryChips interactiveChips">{types.map(x=><button type="button" className={type===x?"active":""} key={x} onClick={()=>setType(x)}>{x}</button>)}</div>
 {filtered.length?<div className="timeline phase5Timeline">{filtered.map((a,i)=><article className="timelineItem" key={a.slug}><div className="timelineNo">{String(i+1).padStart(2,"0")}</div><div className="activityCard"><div className="articleMeta">{a.type} • {a.date}</div><h2>{a.title}</h2><p>{a.excerpt}</p><div className="locationLine">مقام: {a.location||"بعد میں شامل ہوگا"}</div><Link href={`/activities/${a.slug}`}>مکمل تفصیل ←</Link></div></article>)}</div>:<div className="emptyState"><b>کوئی سرگرمی نہیں ملی</b><span>تلاش یا فلٹر تبدیل کریں۔</span></div>}</div>
}
