-- Phase 17 — Roles, permissions, audit log, notifications, monitoring
-- Run after Phase 16.

-- Staff helper functions
create or replace function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(
    select 1 from public.profiles p
    where p.id=auth.uid() and p.role='editor'
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(
    select 1 from public.profiles p
    where p.id=auth.uid() and p.role in ('admin','editor')
  );
$$;

-- Admin can update staff profiles / roles
drop policy if exists "admin profile update" on public.profiles;
create policy "admin profile update"
on public.profiles for update
to authenticated
using(public.is_admin())
with check(public.is_admin());

drop policy if exists "admin profile insert" on public.profiles;
create policy "admin profile insert"
on public.profiles for insert
to authenticated
with check(public.is_admin());

-- Editors can see drafts and create/update content, but cannot delete.
drop policy if exists "staff articles read" on public.articles;
create policy "staff articles read"
on public.articles for select
to authenticated
using(public.is_staff());

drop policy if exists "editor articles insert" on public.articles;
create policy "editor articles insert"
on public.articles for insert
to authenticated
with check(public.is_editor());

drop policy if exists "editor articles update" on public.articles;
create policy "editor articles update"
on public.articles for update
to authenticated
using(public.is_editor())
with check(public.is_editor());

drop policy if exists "staff activities read" on public.activities;
create policy "staff activities read"
on public.activities for select
to authenticated
using(public.is_staff());

drop policy if exists "editor activities insert" on public.activities;
create policy "editor activities insert"
on public.activities for insert
to authenticated
with check(public.is_editor());

drop policy if exists "editor activities update" on public.activities;
create policy "editor activities update"
on public.activities for update
to authenticated
using(public.is_editor())
with check(public.is_editor());

drop policy if exists "editor people insert" on public.people;
create policy "editor people insert"
on public.people for insert
to authenticated
with check(public.is_editor());

drop policy if exists "editor people update" on public.people;
create policy "editor people update"
on public.people for update
to authenticated
using(public.is_editor())
with check(public.is_editor());

-- Site pages were introduced in Phase 13.
drop policy if exists "staff site pages read" on public.site_pages;
create policy "staff site pages read"
on public.site_pages for select
to authenticated
using(public.is_staff());

drop policy if exists "editor site pages insert" on public.site_pages;
create policy "editor site pages insert"
on public.site_pages for insert
to authenticated
with check(public.is_editor());

drop policy if exists "editor site pages update" on public.site_pages;
create policy "editor site pages update"
on public.site_pages for update
to authenticated
using(public.is_editor())
with check(public.is_editor());

-- Editors need media upload/update for content images; delete remains admin-only.
drop policy if exists "editor media insert" on storage.objects;
create policy "editor media insert"
on storage.objects for insert
to authenticated
with check(bucket_id='media' and public.is_editor());

drop policy if exists "editor media update" on storage.objects;
create policy "editor media update"
on storage.objects for update
to authenticated
using(bucket_id='media' and public.is_editor())
with check(bucket_id='media' and public.is_editor());

-- Audit trail
create table if not exists public.audit_logs(
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;

drop policy if exists "admin audit read" on public.audit_logs;
create policy "admin audit read"
on public.audit_logs for select
to authenticated
using(public.is_admin());

drop policy if exists "admin audit insert" on public.audit_logs;
create policy "admin audit insert"
on public.audit_logs for insert
to authenticated
with check(public.is_admin());

create index if not exists idx_audit_logs_created_at on public.audit_logs(created_at desc);
create index if not exists idx_audit_logs_actor on public.audit_logs(actor_id);
create index if not exists idx_audit_logs_entity on public.audit_logs(entity_type,entity_id);

create or replace function public.capture_audit_log()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare
  rid text;
  payload jsonb;
begin
  if tg_op='DELETE' then
    rid := old.id::text;
    payload := jsonb_build_object('before',to_jsonb(old));
  else
    rid := new.id::text;
    payload := jsonb_build_object('after',to_jsonb(new));
  end if;

  insert into public.audit_logs(actor_id,action,entity_type,entity_id,details)
  values(auth.uid(),lower(tg_op),tg_table_name,rid,payload);

  if tg_op='DELETE' then return old; else return new; end if;
end;
$$;

drop trigger if exists audit_articles on public.articles;
create trigger audit_articles after insert or update or delete on public.articles
for each row execute function public.capture_audit_log();

drop trigger if exists audit_activities on public.activities;
create trigger audit_activities after insert or update or delete on public.activities
for each row execute function public.capture_audit_log();

drop trigger if exists audit_people on public.people;
create trigger audit_people after insert or update or delete on public.people
for each row execute function public.capture_audit_log();

drop trigger if exists audit_site_pages on public.site_pages;
create trigger audit_site_pages after insert or update or delete on public.site_pages
for each row execute function public.capture_audit_log();

drop trigger if exists audit_site_settings on public.site_settings;
create trigger audit_site_settings after insert or update or delete on public.site_settings
for each row execute function public.capture_audit_log();

drop trigger if exists audit_profiles on public.profiles;
create trigger audit_profiles after insert or update or delete on public.profiles
for each row execute function public.capture_audit_log();

-- Notification Center
create table if not exists public.admin_notifications(
  id uuid primary key default gen_random_uuid(),
  type text not null default 'system',
  title text not null,
  message text not null default '',
  url text,
  related_id text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.admin_notifications enable row level security;

drop policy if exists "admin notifications read" on public.admin_notifications;
create policy "admin notifications read"
on public.admin_notifications for select
to authenticated
using(public.is_admin());

drop policy if exists "admin notifications update" on public.admin_notifications;
create policy "admin notifications update"
on public.admin_notifications for update
to authenticated
using(public.is_admin())
with check(public.is_admin());

drop policy if exists "admin notifications delete" on public.admin_notifications;
create policy "admin notifications delete"
on public.admin_notifications for delete
to authenticated
using(public.is_admin());

create index if not exists idx_admin_notifications_unread
on public.admin_notifications(is_read,created_at desc);

create or replace function public.notify_admin_on_public_insert()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if tg_table_name='membership_applications' then
    insert into public.admin_notifications(type,title,message,url,related_id)
    values('membership','نئی رکنیت کی درخواست',new.full_name||' — '||new.city,'/admin/memberships',new.id::text);

  elsif tg_table_name='contact_messages' then
    insert into public.admin_notifications(type,title,message,url,related_id)
    values('message','نیا رابطہ پیغام',new.subject||' — '||new.name,'/admin/messages',new.id::text);

  elsif tg_table_name='newsletter_subscribers' then
    insert into public.admin_notifications(type,title,message,url,related_id)
    values('subscriber','نیا Newsletter Subscriber',new.email,'/admin/subscribers',new.id::text);
  end if;

  return new;
end;
$$;

drop trigger if exists notify_membership on public.membership_applications;
create trigger notify_membership after insert on public.membership_applications
for each row execute function public.notify_admin_on_public_insert();

drop trigger if exists notify_contact on public.contact_messages;
create trigger notify_contact after insert on public.contact_messages
for each row execute function public.notify_admin_on_public_insert();

drop trigger if exists notify_subscriber on public.newsletter_subscribers;
create trigger notify_subscriber after insert on public.newsletter_subscribers
for each row execute function public.notify_admin_on_public_insert();
