-- Phase 8 migration: images + Storage + People CRUD
alter table public.articles add column if not exists image_url text;
alter table public.activities add column if not exists image_url text;
alter table public.people add column if not exists image_url text;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('media','media',true,5242880,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update
set public=true,file_size_limit=5242880,allowed_mime_types=array['image/jpeg','image/png','image/webp','image/gif'];

drop policy if exists "public media read" on storage.objects;
create policy "public media read" on storage.objects
for select using (bucket_id='media');

drop policy if exists "admin media insert" on storage.objects;
create policy "admin media insert" on storage.objects
for insert to authenticated
with check (bucket_id='media' and public.is_admin());

drop policy if exists "admin media update" on storage.objects;
create policy "admin media update" on storage.objects
for update to authenticated
using (bucket_id='media' and public.is_admin())
with check (bucket_id='media' and public.is_admin());

drop policy if exists "admin media delete" on storage.objects;
create policy "admin media delete" on storage.objects
for delete to authenticated
using (bucket_id='media' and public.is_admin());
