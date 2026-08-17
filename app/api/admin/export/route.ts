import {NextResponse} from "next/server";
import {createClient} from "../../../../lib/supabase/server";

export async function GET(){
  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});

  const {data:profile}=await s.from("profiles").select("role").eq("id",user.id).single();
  if(profile?.role!=="admin")return NextResponse.json({error:"Forbidden"},{status:403});

  const [articles,activities,people,sitePages,memberships,messages]=await Promise.all([
    s.from("articles").select("*"),
    s.from("activities").select("*"),
    s.from("people").select("*"),
    s.from("site_pages").select("*"),
    s.from("membership_applications").select("*"),
    s.from("contact_messages").select("*")
  ]);

  const payload={
    exported_at:new Date().toISOString(),
    version:"phase14",
    data:{
      articles:articles.data||[],
      activities:activities.data||[],
      people:people.data||[],
      site_pages:sitePages.data||[],
      membership_applications:memberships.data||[],
      contact_messages:messages.data||[]
    }
  };

  return new NextResponse(JSON.stringify(payload,null,2),{
    headers:{
      "Content-Type":"application/json; charset=utf-8",
      "Content-Disposition":`attachment; filename="majlis-backup-${new Date().toISOString().slice(0,10)}.json"`,
      "Cache-Control":"no-store"
    }
  });
}
