import {defaultSiteSettings,type SiteSettings} from "../../data/site";
import {createClient,isSupabaseConfigured} from "../supabase/server";

function mergeSettings(value:any):SiteSettings{
  const d=defaultSiteSettings;
  return {
    brand:{...d.brand,...(value?.brand||{})},
    contact:{...d.contact,...(value?.contact||{})},
    social:{...d.social,...(value?.social||{})},
    footer:{...d.footer,...(value?.footer||{})},
    home:{
      ...d.home,
      ...(value?.home||{}),
      pillars:Array.isArray(value?.home?.pillars)&&value.home.pillars.length
        ? value.home.pillars.map((p:any,i:number)=>({
            icon:p?.icon||d.home.pillars[i]?.icon||"book",
            title:p?.title||"",
            text:p?.text||""
          }))
        : d.home.pillars
    }
  };
}

export async function getSiteSettings():Promise<SiteSettings>{
  if(!isSupabaseConfigured())return defaultSiteSettings;
  try{
    const supabase=await createClient();
    const {data,error}=await supabase.from("site_settings").select("value").eq("setting_key","main").maybeSingle();
    if(error||!data?.value)return defaultSiteSettings;
    return mergeSettings(data.value);
  }catch{
    return defaultSiteSettings;
  }
}
