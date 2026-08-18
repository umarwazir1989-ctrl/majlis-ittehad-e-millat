"use client";
import {FormEvent,useState} from "react";

export default function NewsletterForm(){
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setLoading(true);setMessage("");
    const form=e.currentTarget;
    const data=new FormData(form);

    try{
      const response=await fetch("/api/newsletter",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,website:String(data.get("website")||"")})
      });
      const result=await response.json();
      setMessage(result.message||"درخواست مکمل ہو گئی۔");
      if(response.ok)setEmail("");
    }catch{
      setMessage("عارضی خرابی ہے، دوبارہ کوشش کریں۔");
    }finally{
      setLoading(false);
    }
  }

  return <form className="newsletterFormV16" onSubmit={submit}>
    <input className="hpField" name="website" tabIndex={-1} autoComplete="off"/>
    <div className="newsletterInputRowV16">
      <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="آپ کی ای میل" aria-label="آپ کی ای میل"/>
      <button disabled={loading}>{loading?"...":"شامل ہوں"}</button>
    </div>
    {message&&<small className="newsletterMessageV16">{message}</small>}
  </form>
}
