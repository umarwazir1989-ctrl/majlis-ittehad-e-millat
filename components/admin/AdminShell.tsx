"use client";

import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import {useEffect,useMemo,useState} from "react";

type Profile={
  fullName:string;
  email:string;
  role:"admin"|"editor";
}|null;

type Role="admin"|"editor";
type NavItem={href:string;label:string;icon:string;roles:Role[]};

const items:NavItem[]=[
  {href:"/admin",label:"ڈیش بورڈ",icon:"⌂",roles:["admin","editor"]},
  {href:"/admin/analytics",label:"Analytics",icon:"◒",roles:["admin"]},
  {href:"/admin/articles",label:"مضامین",icon:"✎",roles:["admin","editor"]},
  {href:"/admin/activities",label:"سرگرمیاں",icon:"◈",roles:["admin","editor"]},
  {href:"/admin/people",label:"شخصیات",icon:"◉",roles:["admin","editor"]},
  {href:"/admin/content",label:"بنیادی صفحات",icon:"▤",roles:["admin","editor"]},
  {href:"/admin/review",label:"Review Queue",icon:"✓",roles:["admin"]},
  {href:"/admin/schedule",label:"Publishing Schedule",icon:"◷",roles:["admin"]},
  {href:"/admin/settings",label:"ویب سائٹ سیٹنگز",icon:"⚙",roles:["admin"]},
  {href:"/admin/memberships",label:"رکنیت درخواستیں",icon:"◇",roles:["admin"]},
  {href:"/admin/messages",label:"رابطہ پیغامات",icon:"✉",roles:["admin"]},
  {href:"/admin/subscribers",label:"Subscribers",icon:"◎",roles:["admin"]},
  {href:"/admin/notifications",label:"Notifications",icon:"●",roles:["admin"]},
  {href:"/admin/users",label:"Users & Roles",icon:"♙",roles:["admin"]},
  {href:"/admin/activity-log",label:"Activity Log",icon:"≡",roles:["admin"]},
  {href:"/admin/system",label:"System Health",icon:"◌",roles:["admin"]},
  {href:"/admin/device-qa",label:"Device QA",icon:"▣",roles:["admin"]},
  {href:"/admin/backups",label:"Backup History",icon:"⇩",roles:["admin"]},
  {href:"/admin/export",label:"Quick Export",icon:"↧",roles:["admin"]},
  {href:"/admin/launch",label:"Launch Audit",icon:"✓",roles:["admin"]}
];

export default function AdminShell({profile,children}:{profile:Profile;children:React.ReactNode}){
  const pathname=usePathname();
  const router=useRouter();
  const [open,setOpen]=useState(false);

  const isLogin=pathname==="/admin/login";
  const allowed=useMemo(()=>profile?items.filter(x=>x.roles.includes(profile.role)):[],[profile]);

  useEffect(()=>{
    setOpen(false);
    if(!isLogin&&!profile)router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
  },[pathname,isLogin,profile,router]);

  if(isLogin)return <>{children}</>;

  if(!profile){
    return <div className="adminGateV17"><div className="adminGateSpinnerV17"></div><p>انتظامی رسائی چیک کی جا رہی ہے…</p></div>;
  }

  const active=(href:string)=>href==="/admin"?pathname==="/admin":pathname.startsWith(href);

  return <div className="adminShellV17">
    <button className="adminMobileToggleV17" onClick={()=>setOpen(v=>!v)} aria-label="Admin menu">☰</button>
    {open&&<div className="adminOverlayV17" onClick={()=>setOpen(false)}></div>}

    <aside className={`adminSidebarV17 ${open?"open":""}`}>
      <div className="adminBrandV17">
        <img src="/brand/majlis-logo.svg" alt=""/>
        <div><strong>مجلس اتحادِ ملت</strong><small>Admin Control Center</small></div>
      </div>

      <div className="adminUserCardV17">
        <span>{profile.fullName.slice(0,1)}</span>
        <div><b>{profile.fullName}</b><small>{profile.email}</small></div>
        <em>{profile.role==="admin"?"Admin":"Editor"}</em>
      </div>

      <nav className="adminNavV17">
        {allowed.map(item=><Link key={item.href} href={item.href} className={active(item.href)?"active":""}>
          <i>{item.icon}</i><span>{item.label}</span>
        </Link>)}
      </nav>

      <div className="adminSidebarFootV17">
        <Link href="/" target="_blank">Public Website ↗</Link>
      </div>
    </aside>

    <section className="adminMainV17">
      <div className="adminTopbarV17">
        <div><b>{profile.role==="admin"?"Administrator":"Content Editor"}</b><span>محفوظ انتظامی ماحول</span></div>
        <div className="adminTopActionsV17">
          {profile.role==="admin"&&<Link href="/admin/notifications" aria-label="Notifications">●</Link>}
          <Link href="/">صفحۂ اول ↗</Link>
        </div>
      </div>
      <div className="adminContentV17">{children}</div>
    </section>
  </div>
}
