"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";

export default function AnalyticsTracker(){
  const pathname=usePathname();

  useEffect(()=>{
    if(!pathname||pathname.startsWith("/admin")||pathname.startsWith("/api"))return;

    const payload=JSON.stringify({
      path:pathname,
      referrer:document.referrer||""
    });

    if(navigator.sendBeacon){
      navigator.sendBeacon("/api/analytics/track",new Blob([payload],{type:"application/json"}));
    }else{
      fetch("/api/analytics/track",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:payload,
        keepalive:true
      }).catch(()=>{});
    }
  },[pathname]);

  return null;
}
