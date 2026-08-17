import type {MetadataRoute} from "next";
import {siteDetails} from "../data/site";

export default function manifest():MetadataRoute.Manifest{
  return {
    name:siteDetails.name,
    short_name:siteDetails.shortName,
    description:siteDetails.description,
    start_url:"/",
    display:"standalone",
    background_color:"#fffdf8",
    theme_color:"#17483c",
    lang:"ur",
    dir:"rtl",
    icons:[
      {src:"/brand/majlis-logo.svg",sizes:"any",type:"image/svg+xml"}
    ]
  };
}
