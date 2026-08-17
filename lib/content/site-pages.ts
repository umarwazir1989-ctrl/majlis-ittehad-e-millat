import {createClient,isSupabaseConfigured} from "../supabase/server";
import {fallbackSitePages,type SitePageContent} from "../../data/site-pages";

export async function getSitePage(slug:string):Promise<SitePageContent|undefined>{
  const fallback=fallbackSitePages[slug];
  if(!isSupabaseConfigured()) return fallback;

  try{
    const supabase=await createClient();
    const {data,error}=await supabase
      .from("site_pages")
      .select("slug,eyebrow,title,summary,sections")
      .eq("slug",slug)
      .eq("published",true)
      .maybeSingle();

    if(error||!data) return fallback;

    return {
      slug:data.slug,
      eyebrow:data.eyebrow||"",
      title:data.title,
      summary:data.summary||"",
      sections:Array.isArray(data.sections)?data.sections:[]
    };
  }catch{
    return fallback;
  }
}
