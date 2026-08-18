import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";
import {createBackupSnapshot,deleteBackup} from "./actions";

function bytes(value:number){
  if(value<1024)return `${value} B`;
  if(value<1024*1024)return `${(value/1024).toFixed(1)} KB`;
  return `${(value/1024/1024).toFixed(1)} MB`;
}

export default async function BackupsPage(){
  await requireAdminOnly();
  const s=await createClient();

  const {data,error}=await s.from("backup_runs").select("*").order("created_at",{ascending:false}).limit(50);
  if(error)throw new Error(error.message);

  const rows=await Promise.all((data||[]).map(async row=>{
    const {data:signed}=await s.storage.from("backups").createSignedUrl(row.storage_path,3600);
    return {...row,url:signed?.signedUrl||null};
  }));

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17"><div className="wrap adminSubRow">
      <div>
        <Link href="/admin">ڈیش بورڈ ←</Link>
        <span className="eyebrow">Recovery</span>
        <h1>Backup History</h1>
        <p>اہم database content کو private Supabase Storage میں JSON snapshot کی صورت میں محفوظ کریں۔</p>
      </div>
      <form action={createBackupSnapshot}><button className="adminAdd">+ نیا Backup</button></form>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="backupNoticeV18">
        <b>اہم:</b>
        <span>یہ application-level JSON backup ہے۔ Supabase platform database backup کا متبادل نہیں، لیکن content recovery کے لیے مفید اضافی copy ہے۔</span>
      </div>

      <div className="backupListV18">
        {rows.length?rows.map(row=><article className="backupCardV18" key={row.id}>
          <div className="backupIconV18">⇩</div>
          <div>
            <b>{new Date(row.created_at).toLocaleString("ur-PK")}</b>
            <span>{row.item_count} records • {bytes(row.size_bytes||0)}</span>
            <small>{row.storage_path}</small>
          </div>
          <div className="backupActionsV18">
            {row.url&&<a href={row.url}>Download</a>}
            <form action={deleteBackup.bind(null,row.id,row.storage_path)}><button>حذف</button></form>
          </div>
        </article>):<div className="emptyState"><b>ابھی کوئی backup snapshot موجود نہیں</b></div>}
      </div>
    </div></section>
  </main>
}
