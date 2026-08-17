"use client";

import {useEffect} from "react";
import Link from "next/link";

export default function ErrorPage({error,reset}:{error:Error & {digest?:string};reset:()=>void}){
  useEffect(()=>{console.error(error)},[error]);

  return <main className="statePage">
    <div className="stateCard">
      <span className="stateIcon">!</span>
      <h1>عارضی خرابی پیش آگئی</h1>
      <p>صفحہ لوڈ کرتے ہوئے مسئلہ آیا ہے۔ دوبارہ کوشش کریں یا صفحۂ اول پر واپس جائیں۔</p>
      <div className="stateActions">
        <button className="btn" onClick={reset}>دوبارہ کوشش کریں</button>
        <Link className="btn outline" href="/">صفحہ اول</Link>
      </div>
    </div>
  </main>
}
