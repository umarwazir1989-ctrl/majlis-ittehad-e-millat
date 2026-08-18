import Link from "next/link";
import {createClient} from "../../../lib/supabase/server";
import {requireAdminOnly} from "../../../lib/admin/auth";
import {
  deleteNotification,
  markAllNotificationsRead,
  markNotificationRead
} from "./actions";

export default async function NotificationsPage(){
  await requireAdminOnly();

  const s=await createClient();
  const {data,error}=await s
    .from("admin_notifications")
    .select("*")
    .order("created_at",{ascending:false})
    .limit(100);

  if(error)throw new Error(error.message);

  const rows=data||[];
  const unread=rows.filter(x=>!x.is_read).length;

  return (
    <main className="adminPage adminPageV17">
      <section className="adminSubHero adminSubHeroV17">
        <div className="wrap adminSubRow">
          <div>
            <Link href="/admin">ڈیش بورڈ ←</Link>
            <span className="eyebrow">Notification Center</span>
            <h1>Notifications</h1>
          </div>

          {unread>0&&(
            <form action={markAllNotificationsRead}>
              <button className="adminAdd">
                سب Read کریں ({unread})
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap notificationListV17">
          {rows.length ? (
            rows.map(n=>(
              <article
                className={`notificationCardV17 ${n.is_read?"read":"unread"}`}
                key={n.id}
              >
                <div className="notificationIconV17">
                  {n.type==="membership"
                    ?"◇"
                    :n.type==="message"
                      ?"✉"
                      :n.type==="subscriber"
                        ?"◎"
                        :"●"}
                </div>

                <div className="notificationBodyV17">
                  <div>
                    <b>{n.title}</b>
                    {!n.is_read&&<span>New</span>}
                  </div>
                  <p>{n.message}</p>
                  <small>
                    {new Date(n.created_at).toLocaleString("ur-PK")}
                  </small>
                </div>

                <div className="notificationActionsV17">
                  {!n.is_read&&(
                    <form action={markNotificationRead.bind(null,n.id)}>
                      <button>Read</button>
                    </form>
                  )}

                  <form action={deleteNotification.bind(null,n.id)}>
                    <button className="danger">×</button>
                  </form>
                </div>
              </article>
            ))
          ) : (
            <div className="emptyState">
              <b>کوئی notification موجود نہیں</b>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
