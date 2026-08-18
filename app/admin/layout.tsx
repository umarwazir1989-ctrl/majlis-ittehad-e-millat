import AdminShell from "../../components/admin/AdminShell";
import {getAdminContext} from "../../lib/admin/auth";
import {isSupabaseConfigured} from "../../lib/supabase/server";

export default async function AdminLayout({children}:{children:React.ReactNode}){
  let profile:null|{fullName:string;email:string;role:"admin"|"editor"}=null;

  if(isSupabaseConfigured()){
    const ctx=await getAdminContext({required:false});
    profile=ctx?{fullName:ctx.fullName,email:ctx.email,role:ctx.role}:null;
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
