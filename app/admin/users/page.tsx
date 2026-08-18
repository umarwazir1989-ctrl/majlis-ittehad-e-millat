import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";
import {updateUserProfile} from "./actions";

export default async function UsersPage(){
  await requireAdminOnly();
  const s=await createClient();
  const {data,error}=await s.from("profiles").select("id,full_name,role,created_at").order("created_at",{ascending:true});
  if(error)throw new Error(error.message);

  return <main className="adminPage adminPageV17">
    <section className="adminSubHero adminSubHeroV17"><div className="wrap">
      <Link href="/admin">ڈیش بورڈ ←</Link>
      <span className="eyebrow">Permissions</span>
      <h1>Users & Roles</h1>
      <p>Admin مکمل اختیار رکھتا ہے، جبکہ Editor صرف علمی و تنظیمی content manage کر سکتا ہے۔</p>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="roleGuideV17">
        <article><b>Admin</b><p>Content، settings، users، inbox، notifications، backups اور system monitoring۔</p></article>
        <article><b>Editor</b><p>مضامین، سرگرمیاں، شخصیات اور بنیادی صفحات create/update؛ delete اور sensitive modules نہیں۔</p></article>
      </div>

      <div className="usersGridV17">
        {(data||[]).map(user=><form className="userCardV17" action={updateUserProfile.bind(null,user.id)} key={user.id}>
          <div className="userAvatarV17">{(user.full_name||"U").slice(0,1)}</div>
          <div className="userIdV17"><small>User ID</small><code>{user.id}</code></div>
          <label>نام<input name="full_name" defaultValue={user.full_name||""}/></label>
          <label>Role<select name="role" defaultValue={user.role}><option value="admin">Admin</option><option value="editor">Editor</option></select></label>
          <button className="btn">محفوظ کریں</button>
        </form>)}
      </div>

      <div className="adminAlert">
        نیا Auth user پہلے Supabase Authentication میں بنائیں، پھر اس user کے UUID کے ساتھ profiles table میں profile شامل کریں۔
      </div>
    </div></section>
  </main>
}
