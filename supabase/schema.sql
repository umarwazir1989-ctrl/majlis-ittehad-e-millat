-- Majlis Ittehad-e-Millat — Phase 6 Supabase schema
create extension if not exists "pgcrypto";

create table if not exists public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check(role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.articles(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null,
  author text not null default 'مجلس اتحادِ ملت',
  excerpt text not null default '',
  content text not null default '',
  status text not null default 'draft' check(status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activities(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  type text not null,
  event_date date,
  location text not null default '',
  excerpt text not null default '',
  content text not null default '',
  status text not null default 'draft' check(status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.people(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  council text not null,
  designation text not null default '',
  summary text not null default '',
  bio text not null default '',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.activities enable row level security;
alter table public.people enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin');
$$;

drop policy if exists "published articles public" on public.articles;
create policy "published articles public" on public.articles for select using(status='published' or public.is_admin());
drop policy if exists "admin articles write" on public.articles;
create policy "admin articles write" on public.articles for all using(public.is_admin()) with check(public.is_admin());

drop policy if exists "published activities public" on public.activities;
create policy "published activities public" on public.activities for select using(status='published' or public.is_admin());
drop policy if exists "admin activities write" on public.activities;
create policy "admin activities write" on public.activities for all using(public.is_admin()) with check(public.is_admin());

drop policy if exists "people public read" on public.people;
create policy "people public read" on public.people for select using(true);
drop policy if exists "admin people write" on public.people;
create policy "admin people write" on public.people for all using(public.is_admin()) with check(public.is_admin());

drop policy if exists "profile self read" on public.profiles;
create policy "profile self read" on public.profiles for select using(auth.uid()=id or public.is_admin());

-- After creating your first Auth user, run this manually with that user's UUID:
-- insert into public.profiles(id, full_name, role) values ('YOUR-AUTH-USER-UUID','Administrator','admin');
