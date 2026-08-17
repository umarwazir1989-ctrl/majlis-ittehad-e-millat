"use client";
import {useState} from "react";
import {createClient} from "../../lib/supabase/client";

export default function ImageUploader({
  bucket="media", folder="people", value="", inputName="image_url", label="تصویر"
}:{bucket?:string;folder?:string;value?:string;inputName?:string;label?:string}){
  const [url,setUrl]=useState(value);
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);

  async function upload(file:File){
    setLoading(true); setMessage("");
    try{
      const supabase=createClient();
      const clean=file.name.replace(/[^a-zA-Z0-9._-]/g,"-");
      const path=`${folder}/${Date.now()}-${clean}`;
      const {error}=await supabase.storage.from(bucket).upload(path,file,{cacheControl:"3600",upsert:false});
      if(error) throw error;
      const {data}=supabase.storage.from(bucket).getPublicUrl(path);
      setUrl(data.publicUrl);
      setMessage("تصویر اپلوڈ ہو گئی۔");
    }catch(e:any){
      setMessage(e?.message||"اپلوڈ نہیں ہو سکا۔");
    }finally{
      setLoading(false);
    }
  }

  return <div className="imageUploader">
    <label>{label}
      <input type="file" accept="image/*" disabled={loading}
        onChange={e=>{const f=e.target.files?.[0]; if(f) upload(f)}}/>
    </label>
    <input type="hidden" name={inputName} value={url}/>
    {url&&<div className="imagePreview"><img src={url} alt="Preview"/></div>}
    {message&&<small>{message}</small>}
  </div>
}
