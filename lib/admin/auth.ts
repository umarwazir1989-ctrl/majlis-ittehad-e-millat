import {redirect} from "next/navigation";
import {createClient} from "../supabase/server";

export type StaffRole="admin"|"editor";

export type AdminContext={
  userId:string;
  email:string;
  fullName:string;
  role:StaffRole;
  permissions:{
    manageContent:boolean;
    deleteContent:boolean;
    manageSettings:boolean;
    manageUsers:boolean;
    manageInbox:boolean;
    viewAudit:boolean;
    viewSystem:boolean;
  };
};

export async function getAdminContext(options:{required?:boolean}={required:true}):Promise<AdminContext|null>{
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();

  if(!user){
    if(options.required!==false)redirect("/admin/login");
    return null;
  }

  const {data:profile}=await supabase
    .from("profiles")
    .select("full_name,role")
    .eq("id",user.id)
    .maybeSingle();

  if(!profile||!["admin","editor"].includes(profile.role)){
    if(options.required!==false)redirect("/admin/login?error=role");
    return null;
  }

  const role=profile.role as StaffRole;
  const isAdmin=role==="admin";

  return {
    userId:user.id,
    email:user.email||"",
    fullName:profile.full_name||user.email||"Staff",
    role,
    permissions:{
      manageContent:true,
      deleteContent:isAdmin,
      manageSettings:isAdmin,
      manageUsers:isAdmin,
      manageInbox:isAdmin,
      viewAudit:isAdmin,
      viewSystem:isAdmin
    }
  };
}

export async function requireContentEditor(){
  const ctx=await getAdminContext();
  if(!ctx?.permissions.manageContent)throw new Error("Unauthorized");
  return ctx;
}

export async function requireAdminOnly(){
  const ctx=await getAdminContext();
  if(ctx?.role!=="admin")throw new Error("Unauthorized");
  return ctx;
}
