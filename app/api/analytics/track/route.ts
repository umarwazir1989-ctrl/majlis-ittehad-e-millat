import {NextResponse} from "next/server";
import {createClient,isSupabaseConfigured} from "../../../../lib/supabase/server";

export async function POST(request:Request){
  try{
    if(!isSupabaseConfigured())return NextResponse.json({ok:true,skipped:true});

    const body=await request.json();
    const path=String(body?.path||"").trim().slice(0,500);
    const referrer=String(body?.referrer||"").trim().slice(0,1000);

    if(!path||path.startsWith("/admin")||path.startsWith("/api")){
      return NextResponse.json({ok:true,skipped:true});
    }

    const s=await createClient();
    const {error}=await s.from("analytics_events").insert({
      event_name:"page_view",
      path,
      referrer:referrer||null
    });

    if(error)console.error("Analytics insert:",error.message);
    return NextResponse.json({ok:true});
  }catch{
    return NextResponse.json({ok:true,skipped:true});
  }
}
