-- Phase 14 — final production verification fields
alter table public.people add column if not exists verified boolean not null default false;
alter table public.articles add column if not exists verified boolean not null default false;
alter table public.activities add column if not exists verified boolean not null default false;

create index if not exists idx_articles_verified on public.articles(verified);
create index if not exists idx_activities_verified on public.activities(verified);
create index if not exists idx_people_verified on public.people(verified);

-- Existing rows remain unverified by design.
-- Verify only after checking the actual source material.
