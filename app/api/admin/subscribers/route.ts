import {NextResponse} from "next/server";
import {createClient} from "../../../../lib/supabase/server";

function csv(value:unknown){
  const s=String(value??"").replace(/"/g,'""');
  return `"${s}"`;
}

export async function GET(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});

  const {data:profile}=await s.from("profiles").select("role").eq("id",user.id).single();
  if(profile?.role!=="admin")return NextResponse.json({error:"Forbidden"},{status:403});

  const {data,error}=await s.from("newsletter_subscribers").select("email,status,source,created_at").order("created_at",{ascending:false});
  if(error)return NextResponse.json({error:error.message},{status:500});

  const lines=[
    ["email","status","source","created_at"].map(csv).join(","),
    ...(data||[]).map(x=>[x.email,x.status,x.source,x.created_at].map(csv).join(","))
  ];

  return new NextResponse("\ufeff"+lines.join("\n"),{
    headers:{
      "Content-Type":"text/csv; charset=utf-8",
      "Content-Disposition":`attachment; filename="majlis-subscribers-${new Date().toISOString().slice(0,10)}.csv"`,
      "Cache-Control":"no-store"
    }
  });
}
