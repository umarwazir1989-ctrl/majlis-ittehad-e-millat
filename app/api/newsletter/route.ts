import {NextResponse} from "next/server";
import {createClient,isSupabaseConfigured} from "../../../lib/supabase/server";

export async function POST(request:Request){
  try{
    const body=await request.json();
    const email=String(body?.email||"").trim().toLowerCase();
    const website=String(body?.website||"").trim();

    if(website)return NextResponse.json({ok:true,message:"شکریہ، آپ شامل ہو گئے ہیں۔"});
    if(!email||email.length>180||!email.includes("@")){
      return NextResponse.json({ok:false,message:"درست ای میل درج کریں۔"},{status:400});
    }
    if(!isSupabaseConfigured()){
      return NextResponse.json({ok:false,message:"Newsletter ابھی configure نہیں ہوا۔"},{status:503});
    }

    const supabase=await createClient();
    const {error}=await supabase.from("newsletter_subscribers").insert({email,source:"footer",status:"active"});

    if(error&&error.code!=="23505"){
      console.error("Newsletter insert:",error);
      return NextResponse.json({ok:false,message:"ای میل محفوظ نہیں ہو سکی۔"},{status:500});
    }
    return NextResponse.json({ok:true,message:"شکریہ، آپ اپ ڈیٹس میں شامل ہو گئے ہیں۔"});
  }catch{
    return NextResponse.json({ok:false,message:"درخواست مکمل نہیں ہو سکی۔"},{status:400});
  }
}
