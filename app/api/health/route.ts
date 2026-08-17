import {NextResponse} from "next/server";

export async function GET(){
  const checks={
    app:"ok",
    supabase:Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    siteUrl:Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    emailNotifications:Boolean(process.env.RESEND_API_KEY&&process.env.EMAIL_FROM&&process.env.ADMIN_NOTIFICATION_EMAIL)
  };

  return NextResponse.json({
    status:"ok",
    checks,
    timestamp:new Date().toISOString()
  },{
    headers:{"Cache-Control":"no-store"}
  });
}
