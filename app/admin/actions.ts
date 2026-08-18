"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "../../lib/supabase/server";
import {getAdminContext,requireAdminOnly,type StaffRole} from "../../lib/admin/auth";

const WORKFLOW=["draft","review","approved","scheduled","published","rejected"] as const;
type WorkflowStatus=typeof WORKFLOW[number];

async function contentAccess(deleteOperation=false){
  const ctx=await getAdminContext();
  if(!ctx?.permissions.manageContent)throw new Error("Unauthorized");
  if(deleteOperation&&!ctx.permissions.deleteContent)throw new Error("Editors cannot delete content.");
  return {ctx,supabase:await createClient()};
}

const str=(fd:FormData,key:string)=>String(fd.get(key)||"").trim();

function normalizeStatus(role:StaffRole,raw:string):WorkflowStatus{
  const value=(WORKFLOW as readonly string[]).includes(raw)?raw as WorkflowStatus:"draft";
  if(role==="editor"&&!["draft","review"].includes(value))return "review";
  return value;
}

function workflowMeta(role:StaffRole,status:WorkflowStatus,fd:FormData,userId:string){
  const rawSchedule=str(fd,"scheduled_for");
  const scheduled_for=status==="scheduled"&&rawSchedule?new Date(rawSchedule).toISOString():null;
  if(status==="scheduled"&&!scheduled_for)throw new Error("Scheduled content requires a publish date/time.");

  const reviewed=["approved","scheduled","published","rejected"].includes(status)&&role==="admin";

  return {
    status,
    scheduled_for,
    published_at:status==="published"?new Date().toISOString():null,
    reviewed_by:reviewed?userId:null,
    reviewed_at:reviewed?new Date().toISOString():null,
    review_note:str(fd,"review_note")||""
  };
}

function revalidateContent(kind:"articles"|"activities"){
  revalidatePath(`/${kind}`);
  revalidatePath(`/admin/${kind}`);
  revalidatePath("/admin/review");
  revalidatePath("/admin/schedule");
  revalidatePath("/admin/analytics");
}

export async function logout(){
  const s=await createClient();
  await s.auth.signOut();
  redirect("/admin/login");
}

export async function createArticle(fd:FormData){
  const {ctx,supabase:s}=await contentAccess();
  const status=normalizeStatus(ctx.role,str(fd,"status"));
  const payload={
    title:str(fd,"title"),
    slug:str(fd,"slug"),
    category:str(fd,"category"),
    author:str(fd,"author")||"مجلس اتحادِ ملت",
    excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),
    image_url:str(fd,"image_url")||null,
    ...workflowMeta(ctx.role,status,fd,ctx.userId)
  };

  const {error}=await s.from("articles").insert(payload);
  if(error)throw new Error(error.message);

  revalidateContent("articles");
  redirect("/admin/articles");
}

export async function updateArticle(id:string,fd:FormData){
  const {ctx,supabase:s}=await contentAccess();
  const status=normalizeStatus(ctx.role,str(fd,"status"));
  const payload={
    title:str(fd,"title"),
    slug:str(fd,"slug"),
    category:str(fd,"category"),
    author:str(fd,"author"),
    excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),
    image_url:str(fd,"image_url")||null,
    updated_at:new Date().toISOString(),
    ...workflowMeta(ctx.role,status,fd,ctx.userId)
  };

  const {error}=await s.from("articles").update(payload).eq("id",id);
  if(error)throw new Error(error.message);

  revalidateContent("articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id:string){
  const {supabase:s}=await contentAccess(true);
  const {error}=await s.from("articles").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidateContent("articles");
}

export async function createActivity(fd:FormData){
  const {ctx,supabase:s}=await contentAccess();
  const status=normalizeStatus(ctx.role,str(fd,"status"));
  const payload={
    title:str(fd,"title"),
    slug:str(fd,"slug"),
    type:str(fd,"type"),
    event_date:str(fd,"event_date")||null,
    location:str(fd,"location"),
    excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),
    image_url:str(fd,"image_url")||null,
    ...workflowMeta(ctx.role,status,fd,ctx.userId)
  };

  const {error}=await s.from("activities").insert(payload);
  if(error)throw new Error(error.message);

  revalidateContent("activities");
  redirect("/admin/activities");
}

export async function updateActivity(id:string,fd:FormData){
  const {ctx,supabase:s}=await contentAccess();
  const status=normalizeStatus(ctx.role,str(fd,"status"));
  const payload={
    title:str(fd,"title"),
    slug:str(fd,"slug"),
    type:str(fd,"type"),
    event_date:str(fd,"event_date")||null,
    location:str(fd,"location"),
    excerpt:str(fd,"excerpt"),
    content:str(fd,"content"),
    image_url:str(fd,"image_url")||null,
    updated_at:new Date().toISOString(),
    ...workflowMeta(ctx.role,status,fd,ctx.userId)
  };

  const {error}=await s.from("activities").update(payload).eq("id",id);
  if(error)throw new Error(error.message);

  revalidateContent("activities");
  redirect("/admin/activities");
}

export async function deleteActivity(id:string){
  const {supabase:s}=await contentAccess(true);
  const {error}=await s.from("activities").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidateContent("activities");
}

export async function createPerson(fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={
    name:str(fd,"name"),slug:str(fd,"slug"),council:str(fd,"council"),
    designation:str(fd,"designation"),summary:str(fd,"summary"),bio:str(fd,"bio"),
    image_url:str(fd,"image_url")||null
  };
  const {error}=await s.from("people").insert(payload);
  if(error)throw new Error(error.message);
  revalidatePath("/leadership");revalidatePath("/advisory");revalidatePath("/admin/people");
  redirect("/admin/people");
}

export async function updatePerson(id:string,fd:FormData){
  const {supabase:s}=await contentAccess();
  const payload={
    name:str(fd,"name"),slug:str(fd,"slug"),council:str(fd,"council"),
    designation:str(fd,"designation"),summary:str(fd,"summary"),bio:str(fd,"bio"),
    image_url:str(fd,"image_url")||null
  };
  const {error}=await s.from("people").update(payload).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/leadership");revalidatePath("/advisory");revalidatePath("/admin/people");
  redirect("/admin/people");
}

export async function deletePerson(id:string){
  const {supabase:s}=await contentAccess(true);
  const {error}=await s.from("people").delete().eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/leadership");revalidatePath("/advisory");revalidatePath("/admin/people");
}

export async function reviewContent(kind:"articles"|"activities",id:string,decision:"approved"|"published"|"rejected",fd:FormData){
  const ctx=await requireAdminOnly();
  const s=await createClient();
  const note=str(fd,"review_note");

  const payload:any={
    status:decision,
    review_note:note,
    reviewed_by:ctx.userId,
    reviewed_at:new Date().toISOString(),
    scheduled_for:null
  };
  if(decision==="published")payload.published_at=new Date().toISOString();

  const {error}=await s.from(kind).update(payload).eq("id",id);
  if(error)throw new Error(error.message);

  revalidateContent(kind);
}

export async function scheduleContent(kind:"articles"|"activities",id:string,fd:FormData){
  const ctx=await requireAdminOnly();
  const raw=str(fd,"scheduled_for");
  if(!raw)throw new Error("Schedule date/time is required.");

  const s=await createClient();
  const {error}=await s.from(kind).update({
    status:"scheduled",
    scheduled_for:new Date(raw).toISOString(),
    reviewed_by:ctx.userId,
    reviewed_at:new Date().toISOString(),
    review_note:str(fd,"review_note"),
    published_at:null
  }).eq("id",id);

  if(error)throw new Error(error.message);
  revalidateContent(kind);
}

export async function cancelSchedule(kind:"articles"|"activities",id:string){
  await requireAdminOnly();
  const s=await createClient();
  const {error}=await s.from(kind).update({
    status:"draft",
    scheduled_for:null,
    published_at:null
  }).eq("id",id);
  if(error)throw new Error(error.message);
  revalidateContent(kind);
}

export async function publishNow(kind:"articles"|"activities",id:string){
  const ctx=await requireAdminOnly();
  const s=await createClient();
  const {error}=await s.from(kind).update({
    status:"published",
    scheduled_for:null,
    published_at:new Date().toISOString(),
    reviewed_by:ctx.userId,
    reviewed_at:new Date().toISOString()
  }).eq("id",id);
  if(error)throw new Error(error.message);
  revalidateContent(kind);
}
