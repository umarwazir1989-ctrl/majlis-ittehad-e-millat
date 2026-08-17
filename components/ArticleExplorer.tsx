"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import type {PublicArticle} from "../lib/content/public";

export default function ArticleExplorer({articles}:{articles:PublicArticle[]}){
  const categories=["تمام",...Array.from(new Set(articles.map(x=>x.category)))];
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("تمام");
  const filtered=useMemo(()=>articles.filter(a=>{
    const q=query.trim().toLowerCase();
    return (category==="تمام"||a.category===category)&&(!q||[a.title,a.category,a.author,a.excerpt].join(" ").toLowerCase().includes(q));
  }),[articles,query,category]);
  return <div><div className="liveToolbar"><div className="liveSearch"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="عنوان، موضوع یا مصنف تلاش کریں"/></div><div className="filterCount">{filtered.length} نتائج</div></div>
  <div className="categoryChips interactiveChips">{categories.map(x=><button type="button" className={category===x?"active":""} key={x} onClick={()=>setCategory(x)}>{x}</button>)}</div>
  {filtered.length?<div className="articleGrid phase5Grid">{filtered.map((a,i)=><article className="articleCard" key={a.slug}><div className="articleVisual"><span>{a.category}</span><b>{String(i+1).padStart(2,"0")}</b></div><div className="articleBody"><div className="articleMeta">{a.author} • {a.date}</div><h2>{a.title}</h2><p>{a.excerpt}</p><Link href={`/articles/${a.slug}`}>مکمل مضمون پڑھیں ←</Link></div></article>)}</div>:<div className="emptyState"><b>کوئی مضمون نہیں ملا</b><span>تلاش یا زمرہ تبدیل کریں۔</span></div>}</div>
}
