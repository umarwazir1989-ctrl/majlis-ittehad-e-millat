"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import {articles} from "../data/articles";
import {activities} from "../data/activities";
import {people} from "../data/people";

export default function SearchHub(){
 const [q,setQ]=useState("");
 const query=q.trim().toLowerCase();
 const results=useMemo(()=>{
   if(!query)return [];
   const a=articles.filter(x=>[x.title,x.category,x.author,x.excerpt].join(" ").toLowerCase().includes(query)).map(x=>({kind:"مضمون",title:x.title,desc:x.excerpt,href:`/articles/${x.slug}`}));
   const e=activities.filter(x=>[x.title,x.type,x.location,x.excerpt].join(" ").toLowerCase().includes(query)).map(x=>({kind:"سرگرمی",title:x.title,desc:x.excerpt,href:`/activities/${x.slug}`}));
   const p=people.filter(x=>[x.name,x.council,x.designation,x.summary,...x.expertise].join(" ").toLowerCase().includes(query)).map(x=>({kind:"شخصیت",title:x.name,desc:`${x.council} — ${x.summary}`,href:`/people/${x.slug}`}));
   return [...a,...e,...p];
 },[query]);
 return <div className="searchHub">
   <div className="bigSearch"><span>⌕</span><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="مضامین، سرگرمیاں اور شخصیات تلاش کریں"/></div>
   {!query?<div className="searchPrompt"><b>تلاش شروع کریں</b><p>مثلاً: اختلاف، فکری دفاع، مجلس بزرگان، سیمینار</p></div>:<div className="searchResults"><div className="resultSummary">{results.length} نتائج ملے</div>{results.length?results.map((r,i)=><Link className="searchResult" href={r.href} key={`${r.kind}-${i}`}><span>{r.kind}</span><div><h3>{r.title}</h3><p>{r.desc}</p></div><b>←</b></Link>):<div className="emptyState"><b>کوئی نتیجہ نہیں ملا</b><span>دوسرا لفظ لکھ کر کوشش کریں۔</span></div>}</div>}
 </div>
}
