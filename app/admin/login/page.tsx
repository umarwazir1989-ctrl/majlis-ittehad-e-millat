import LoginForm from "./LoginForm";
import {isSupabaseConfigured} from "../../../lib/supabase/server";

export default function LoginPage(){
  const configured=isSupabaseConfigured();
  return <main className="adminLoginPage"><div className="adminLoginCard">
    <div className="adminLoginBrand"><b>م</b><h1>انتظامی لاگ اِن</h1><p>مجلس اتحادِ ملت</p></div>
    {configured?<LoginForm/>:<div className="adminSetupBox"><h3>Supabase ابھی configure نہیں</h3><p>.env.local میں URL اور Anon Key شامل کریں، پھر دوبارہ site چلائیں۔</p></div>}
  </div></main>
}
