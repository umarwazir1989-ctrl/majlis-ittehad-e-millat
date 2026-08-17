import {createClient,isSupabaseConfigured} from "../supabase/server";
import {articles as staticArticles} from "../../data/articles";
import {activities as staticActivities} from "../../data/activities";
import {people as staticPeople} from "../../data/people";

export type PublicArticle={
  id?:string;slug:string;title:string;category:string;author:string;date:string;
  excerpt:string;content:string[];
};
export type PublicActivity={
  id?:string;slug:string;title:string;type:string;date:string;location:string;
  excerpt:string;content:string[];
};
export type PublicPerson={
  id?:string;slug:string;name:string;initials:string;council:string;designation:string;
  city:string;expertise:string[];summary:string;bio:string[];
};

function initials(name:string){
  return name.split(/\s+/).filter(Boolean).slice(-2).map(x=>x[0]).join(" ");
}
function paragraphs(value:string|null|undefined){
  return String(value||"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
}
function displayDate(value:string|null|undefined){
  if(!value)return "تاریخ بعد میں شامل ہوگی";
  try{return new Intl.DateTimeFormat("ur-PK",{year:"numeric",month:"long",day:"numeric"}).format(new Date(value))}
  catch{return value}
}

export async function getPublicArticles():Promise<PublicArticle[]>{
  if(!isSupabaseConfigured()) return staticArticles;
  try{
    const supabase=await createClient();
    const {data,error}=await supabase.from("articles").select("id,title,slug,category,author,excerpt,content,created_at").eq("status","published").order("created_at",{ascending:false});
    if(error||!data?.length)return staticArticles;
    return data.map(x=>({id:x.id,title:x.title,slug:x.slug,category:x.category,author:x.author,date:displayDate(x.created_at),excerpt:x.excerpt,content:paragraphs(x.content)}));
  }catch{return staticArticles}
}

export async function getPublicArticle(slug:string):Promise<PublicArticle|undefined>{
  if(isSupabaseConfigured()){
    try{
      const supabase=await createClient();
      const {data,error}=await supabase.from("articles").select("id,title,slug,category,author,excerpt,content,created_at").eq("slug",slug).eq("status","published").maybeSingle();
      if(!error&&data)return {id:data.id,title:data.title,slug:data.slug,category:data.category,author:data.author,date:displayDate(data.created_at),excerpt:data.excerpt,content:paragraphs(data.content)};
    }catch{}
  }
  return staticArticles.find(x=>x.slug===slug);
}

export async function getPublicActivities():Promise<PublicActivity[]>{
  if(!isSupabaseConfigured())return staticActivities;
  try{
    const supabase=await createClient();
    const {data,error}=await supabase.from("activities").select("id,title,slug,type,event_date,location,excerpt,content,created_at").eq("status","published").order("event_date",{ascending:false,nullsFirst:false});
    if(error||!data?.length)return staticActivities;
    return data.map(x=>({id:x.id,title:x.title,slug:x.slug,type:x.type,date:displayDate(x.event_date||x.created_at),location:x.location||"",excerpt:x.excerpt,content:paragraphs(x.content)}));
  }catch{return staticActivities}
}

export async function getPublicActivity(slug:string):Promise<PublicActivity|undefined>{
  if(isSupabaseConfigured()){
    try{
      const supabase=await createClient();
      const {data,error}=await supabase.from("activities").select("id,title,slug,type,event_date,location,excerpt,content,created_at").eq("slug",slug).eq("status","published").maybeSingle();
      if(!error&&data)return {id:data.id,title:data.title,slug:data.slug,type:data.type,date:displayDate(data.event_date||data.created_at),location:data.location||"",excerpt:data.excerpt,content:paragraphs(data.content)};
    }catch{}
  }
  return staticActivities.find(x=>x.slug===slug);
}

export async function getPublicPeople():Promise<PublicPerson[]>{
  if(!isSupabaseConfigured())return staticPeople;
  try{
    const supabase=await createClient();
    const {data,error}=await supabase.from("people").select("id,name,slug,council,designation,summary,bio").order("created_at",{ascending:true});
    if(error||!data?.length)return staticPeople;
    return data.map(x=>({id:x.id,name:x.name,slug:x.slug,initials:initials(x.name),council:x.council,designation:x.designation||"",city:"معلومات بعد میں شامل ہوں گی",expertise:[],summary:x.summary||"",bio:paragraphs(x.bio)}));
  }catch{return staticPeople}
}

export async function getPublicPerson(slug:string):Promise<PublicPerson|undefined>{
  if(isSupabaseConfigured()){
    try{
      const supabase=await createClient();
      const {data,error}=await supabase.from("people").select("id,name,slug,council,designation,summary,bio").eq("slug",slug).maybeSingle();
      if(!error&&data)return {id:data.id,name:data.name,slug:data.slug,initials:initials(data.name),council:data.council,designation:data.designation||"",city:"معلومات بعد میں شامل ہوں گی",expertise:[],summary:data.summary||"",bio:paragraphs(data.bio)};
    }catch{}
  }
  return staticPeople.find(x=>x.slug===slug);
}
