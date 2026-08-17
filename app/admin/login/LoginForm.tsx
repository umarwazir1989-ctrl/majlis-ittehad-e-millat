"use client";
import {FormEvent,useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import {createClient} from "../../../lib/supabase/client";

export default function LoginForm(){
  const router=useRouter();
  const params=useSearchParams();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:FormEvent){
    e.preventDefault(); setLoading(true); setMessage("");
    try{
      const supabase=createClient();
      const {error}=await supabase.auth.signInWithPassword({email,password});
      if(error) throw error;
      router.replace(params.get("next")||"/admin");
      router.refresh();
    }catch(error:any){setMessage(error?.message||"لاگ اِن نہیں ہو سکا۔")}
    finally{setLoading(false)}
  }
  return <form className="adminLoginForm" onSubmit={submit}>
    <label>ای میل<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com"/></label>
    <label>پاس ورڈ<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>
    {message&&<div className="adminError">{message}</div>}
    <button className="btn" disabled={loading}>{loading?"جاری ہے...":"لاگ اِن"}</button>
  </form>
}
