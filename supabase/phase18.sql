-- Phase 18 — Analytics + Editorial Workflow + Scheduling + Backup History
-- Run AFTER Phase 17.

-- =========================================================
-- 1) Editorial workflow / scheduling
-- =========================================================

alter table public.articles
  drop constraint if exists articles_status_check;

alter table public.activities
  drop constraint if exists activities_status_check;

alter table public.articles
  add constraint articles_status_check
  check(status in ('draft','review','approved','scheduled','published','rejected'));

alter table public.activities
  add constraint activities_status_check
  check(status in ('draft','review','approved','scheduled','published','rejected'));

alter table public.articles
  add column if not exists scheduled_for timestamptz,
  add column if not exists published_at timestamptz,
  add column if not exists reviewed_by uuid references public.profiles(id) on delete set null,
  add column if not exists reviewed_at timestamptz,
  add column if not exists review_note text not null default '';

alter table public.activities
  add column if not exists scheduled_for timestamptz,
  add column if not exists published_at timestamptz,
  add column if not exists reviewed_by uuid references public.profiles(id) on delete set null,
  add column if not exists reviewed_at timestamptz,
  add column if not exists review_note text not null default '';

update public.articles
set published_at=coalesce(published_at,created_at)
where status='published' and published_at is null;

update public.activities
set published_at=coalesce(published_at,created_at)
where status='published' and published_at is null;

create index if not exists idx_articles_workflow
on public.articles(status,scheduled_for);

create index if not exists idx_activities_workflow
on public.activities(status,scheduled_for);

-- Public reads published material and scheduled material whose time has arrived.
drop policy if exists "published articles public" on public.articles;
create policy "published articles public"
on public.articles for select
using(
  status='published'
  or (status='scheduled' and scheduled_for is not null and scheduled_for<=now())
  or public.is_staff()
);

drop policy if exists "published activities public" on public.activities;
create policy "published activities public"
on public.activities for select
using(
  status='published'
  or (status='scheduled' and scheduled_for is not null and scheduled_for<=now())
  or public.is_staff()
);

-- Editors may only create/update draft or review items.
drop policy if exists "editor articles insert" on public.articles;
create policy "editor articles insert"
on public.articles for insert
to authenticated
with check(public.is_editor() and status in ('draft','review'));

drop policy if exists "editor articles update" on public.articles;
create policy "editor articles update"
on public.articles for update
to authenticated
using(public.is_editor() and status in ('draft','review'))
with check(public.is_editor() and status in ('draft','review'));

drop policy if exists "editor activities insert" on public.activities;
create policy "editor activities insert"
on public.activities for insert
to authenticated
with check(public.is_editor() and status in ('draft','review'));

drop policy if exists "editor activities update" on public.activities;
create policy "editor activities update"
on public.activities for update
to authenticated
using(public.is_editor() and status in ('draft','review'))
with check(public.is_editor() and status in ('draft','review'));

-- =========================================================
-- 2) Privacy-friendly page analytics
-- =========================================================

create table if not exists public.analytics_events(
  id bigint generated always as identity primary key,
  event_name text not null default 'page_view',
  path text not null,
  referrer text,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

drop policy if exists "public analytics insert" on public.analytics_events;
create policy "public analytics insert"
on public.analytics_events for insert
to anon,authenticated
with check(
  event_name='page_view'
  and char_length(path) between 1 and 500
);

drop policy if exists "admin analytics read" on public.analytics_events;
create policy "admin analytics read"
on public.analytics_events for select
to authenticated
using(public.is_admin());

drop policy if exists "admin analytics delete" on public.analytics_events;
create policy "admin analytics delete"
on public.analytics_events for delete
to authenticated
using(public.is_admin());

create index if not exists idx_analytics_created_at
on public.analytics_events(created_at desc);

create index if not exists idx_analytics_path
on public.analytics_events(path);

-- =========================================================
-- 3) Application-level backup history
-- =========================================================

create table if not exists public.backup_runs(
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles(id) on delete set null,
  storage_path text not null unique,
  item_count integer not null default 0,
  size_bytes bigint not null default 0,
  status text not null default 'completed' check(status in ('completed','failed')),
  created_at timestamptz not null default now()
);

alter table public.backup_runs enable row level security;

drop policy if exists "admin backups read" on public.backup_runs;
create policy "admin backups read"
on public.backup_runs for select
to authenticated
using(public.is_admin());

drop policy if exists "admin backups insert" on public.backup_runs;
create policy "admin backups insert"
on public.backup_runs for insert
to authenticated
with check(public.is_admin());

drop policy if exists "admin backups delete" on public.backup_runs;
create policy "admin backups delete"
on public.backup_runs for delete
to authenticated
using(public.is_admin());

create index if not exists idx_backup_runs_created_at
on public.backup_runs(created_at desc);

insert into storage.buckets(id,name,public)
values('backups','backups',false)
on conflict(id) do update set public=false;

drop policy if exists "admin backup storage read" on storage.objects;
create policy "admin backup storage read"
on storage.objects for select
to authenticated
using(bucket_id='backups' and public.is_admin());

drop policy if exists "admin backup storage insert" on storage.objects;
create policy "admin backup storage insert"
on storage.objects for insert
to authenticated
with check(bucket_id='backups' and public.is_admin());

drop policy if exists "admin backup storage delete" on storage.objects;
create policy "admin backup storage delete"
on storage.objects for delete
to authenticated
using(bucket_id='backups' and public.is_admin());

-- =========================================================
-- 4) Initial system notification
-- =========================================================

insert into public.admin_notifications(type,title,message,url)
values(
  'system',
  'Phase 18 فعال',
  'Analytics، Editorial Review، Scheduled Publishing اور Backup History فعال کر دیے گئے ہیں۔',
  '/admin'
);
