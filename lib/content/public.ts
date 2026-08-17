import {createClient,isSupabaseConfigured} from "../supabase/server";
import {articles as staticArticles} from "../../data/articles";
import {activities as staticActivities} from "../../data/activities";
import {people as staticPeople} from "../../data/people";

export type PublicArticle={
  id?:string;slug:string;title:string;category:string;author:string;date:string;
  excerpt:string;content:string[];image_url?:string|null;verified?:boolean
};
export type PublicActivity={
  id?:string;slug:string;title:string;type:string;date:string;location:string;
  excerpt:string;content:string[];image_url?:string|null;verified?:boolean
};
export type PublicPerson={
  id?:string;slug:string;name:string;initials:string;council:string;designation:string;
  city:string;expertise:string[];summary:string;bio:string[];image_url?:string|null;verified?:boolean
};

const productionMode=process.env.NEXT_PUBLIC_CONTENT_MODE==="production";
const paragraphs=(v:string|null|undefined)=>String(v||"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
const initials=(name:string)=>name.split(/\s+/).filter(Boolean).slice(-2).map(x=>x[0]).join(" ");
function displayDate(v:string|null|undefined){
  if(!v)return"تاریخ بعد میں شامل ہوگی";
  try{return new Intl.DateTimeFormat("ur-PK",{year:"numeric",month:"long",day:"numeric"}).format(new Date(v))}
  catch{return v}
}

export async function getPublicArticles():Promise<PublicArticle[]>{
  if(!isSupabaseConfigured()) return productionMode?[]:staticArticles;
  try{
    const s=await createClient();
    const {data,error}=await s.from("articles")
      .select("id,title,slug,category,author,excerpt,content,created_at,image_url,verified")
      .eq("status","published")
      .order("created_at",{ascending:false});
    if(error||!data?.length)return productionMode?[]:staticArticles;
    return data.map(x=>({
      id:x.id,title:x.title,slug:x.slug,category:x.category,author:x.author,
      date:displayDate(x.created_at),excerpt:x.excerpt,content:paragraphs(x.content),
      image_url:x.image_url,verified:Boolean(x.verified)
    }));
  }catch{return productionMode?[]:staticArticles}
}

export async function getPublicArticle(slug:string):Promise<PublicArticle|undefined>{
  if(isSupabaseConfigured()){
    try{
      const s=await createClient();
      const {data,error}=await s.from("articles")
        .select("id,title,slug,category,author,excerpt,content,created_at,image_url,verified")
        .eq("slug",slug).eq("status","published").maybeSingle();
      if(!error&&data)return{
        id:data.id,title:data.title,slug:data.slug,category:data.category,author:data.author,
        date:displayDate(data.created_at),excerpt:data.excerpt,content:paragraphs(data.content),
        image_url:data.image_url,verified:Boolean(data.verified)
      };
    }catch{}
  }
  return productionMode?undefined:staticArticles.find(x=>x.slug===slug);
}

export async function getPublicActivities():Promise<PublicActivity[]>{
  if(!isSupabaseConfigured())return productionMode?[]:staticActivities;
  try{
    const s=await createClient();
    const {data,error}=await s.from("activities")
      .select("id,title,slug,type,event_date,location,excerpt,content,created_at,image_url,verified")
      .eq("status","published")
      .order("event_date",{ascending:false,nullsFirst:false});
    if(error||!data?.length)return productionMode?[]:staticActivities;
    return data.map(x=>({
      id:x.id,title:x.title,slug:x.slug,type:x.type,date:displayDate(x.event_date||x.created_at),
      location:x.location||"",excerpt:x.excerpt,content:paragraphs(x.content),
      image_url:x.image_url,verified:Boolean(x.verified)
    }));
  }catch{return productionMode?[]:staticActivities}
}

export async function getPublicActivity(slug:string):Promise<PublicActivity|undefined>{
  if(isSupabaseConfigured()){
    try{
      const s=await createClient();
      const {data,error}=await s.from("activities")
        .select("id,title,slug,type,event_date,location,excerpt,content,created_at,image_url,verified")
        .eq("slug",slug).eq("status","published").maybeSingle();
      if(!error&&data)return{
        id:data.id,title:data.title,slug:data.slug,type:data.type,date:displayDate(data.event_date||data.created_at),
        location:data.location||"",excerpt:data.excerpt,content:paragraphs(data.content),
        image_url:data.image_url,verified:Boolean(data.verified)
      };
    }catch{}
  }
  return productionMode?undefined:staticActivities.find(x=>x.slug===slug);
}

export async function getPublicPeople():Promise<PublicPerson[]>{
  if(!isSupabaseConfigured())return productionMode?[]:staticPeople;
  try{
    const s=await createClient();
    const {data,error}=await s.from("people")
      .select("id,name,slug,council,designation,summary,bio,image_url,verified")
      .order("created_at",{ascending:true});
    if(error||!data?.length)return productionMode?[]:staticPeople;
    return data.map(x=>({
      id:x.id,name:x.name,slug:x.slug,initials:initials(x.name),council:x.council,
      designation:x.designation||"",city:"معلومات بعد میں شامل ہوں گی",expertise:[],
      summary:x.summary||"",bio:paragraphs(x.bio),image_url:x.image_url,verified:Boolean(x.verified)
    }));
  }catch{return productionMode?[]:staticPeople}
}

export async function getPublicPerson(slug:string):Promise<PublicPerson|undefined>{
  if(isSupabaseConfigured()){
    try{
      const s=await createClient();
      const {data,error}=await s.from("people")
        .select("id,name,slug,council,designation,summary,bio,image_url,verified")
        .eq("slug",slug).maybeSingle();
      if(!error&&data)return{
        id:data.id,name:data.name,slug:data.slug,initials:initials(data.name),council:data.council,
        designation:data.designation||"",city:"معلومات بعد میں شامل ہوں گی",expertise:[],
        summary:data.summary||"",bio:paragraphs(data.bio),image_url:data.image_url,verified:Boolean(data.verified)
      };
    }catch{}
  }
  return productionMode?undefined:staticPeople.find(x=>x.slug===slug);
}
