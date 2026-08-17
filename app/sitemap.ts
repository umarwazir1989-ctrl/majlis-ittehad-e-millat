import type {MetadataRoute} from "next";
import {siteConfig} from "../lib/seo/site";
import {getPublicArticles,getPublicActivities,getPublicPeople} from "../lib/content/public";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const [articles,activities,people]=await Promise.all([getPublicArticles(),getPublicActivities(),getPublicPeople()]);
  const staticRoutes=["","/about","/vision","/leadership","/advisory","/articles","/activities","/membership","/contact","/search"];
  return [
    ...staticRoutes.map(path=>({url:`${siteConfig.url}${path}`,changeFrequency:path===""?"weekly":"monthly" as const,priority:path===""?1:0.7})),
    ...articles.map(x=>({url:`${siteConfig.url}/articles/${x.slug}`,changeFrequency:"monthly" as const,priority:0.8})),
    ...activities.map(x=>({url:`${siteConfig.url}/activities/${x.slug}`,changeFrequency:"monthly" as const,priority:0.7})),
    ...people.map(x=>({url:`${siteConfig.url}/people/${x.slug}`,changeFrequency:"monthly" as const,priority:0.7}))
  ];
}
