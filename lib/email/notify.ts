type EmailInput={to:string|string[];subject:string;html:string};

export function isEmailConfigured(){
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(input:EmailInput){
  if(!isEmailConfigured()) return {ok:false,skipped:true};
  const to=Array.isArray(input.to)?input.to:[input.to];
  const response=await fetch("https://api.resend.com/emails",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      from:process.env.EMAIL_FROM,
      to,
      subject:input.subject,
      html:input.html
    })
  });
  if(!response.ok){
    const text=await response.text();
    console.error("Email send failed:",text);
    return {ok:false,skipped:false};
  }
  return {ok:true,skipped:false};
}

export async function notifyAdmin(subject:string,html:string){
  const to=process.env.ADMIN_NOTIFICATION_EMAIL;
  if(!to) return {ok:false,skipped:true};
  return sendEmail({to,subject,html});
}
