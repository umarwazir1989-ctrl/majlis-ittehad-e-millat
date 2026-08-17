-- Phase 9: memberships + contact messages
create table if not exists public.membership_applications(
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  city text not null,
  profession text not null,
  introduction text not null default '',
  status text not null default 'new' check(status in ('new','reviewed','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new' check(status in ('new','read','replied','closed')),
  created_at timestamptz not null default now()
);

alter table public.membership_applications enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "public membership insert" on public.membership_applications;
create policy "public membership insert" on public.membership_applications
for insert to anon, authenticated with check(true);

drop policy if exists "admin membership read" on public.membership_applications;
create policy "admin membership read" on public.membership_applications
for select to authenticated using(public.is_admin());

drop policy if exists "admin membership update" on public.membership_applications;
create policy "admin membership update" on public.membership_applications
for update to authenticated using(public.is_admin()) with check(public.is_admin());

drop policy if exists "public contact insert" on public.contact_messages;
create policy "public contact insert" on public.contact_messages
for insert to anon, authenticated with check(true);

drop policy if exists "admin contact read" on public.contact_messages;
create policy "admin contact read" on public.contact_messages
for select to authenticated using(public.is_admin());

drop policy if exists "admin contact update" on public.contact_messages;
create policy "admin contact update" on public.contact_messages
for update to authenticated using(public.is_admin()) with check(public.is_admin());
