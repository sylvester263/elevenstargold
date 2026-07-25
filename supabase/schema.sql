-- Eleven Star Gold — Supabase schema
-- Paste into the Supabase SQL editor for a fresh project (Settings > SQL
-- Editor > New query). Run once. Idempotent-ish via IF NOT EXISTS/OR
-- REPLACE where practical, but this is meant for a one-time initial setup,
-- not a migration chain — 08-tech-stack-and-conventions.md.
--
-- After running this file:
--   1. Create the single admin user: Authentication > Users > Add user
--      (email + password). There is no public sign-up flow — 05-admin-panel-and-blog.md.
--   2. Seed the site_settings singleton row (see bottom of this file) with
--      real values, replacing what's currently hardcoded in lib/settings.ts.
--   3. Copy Project URL / anon key / service role key into .env.local
--      (see .env.local.example).

-- ============================================================
-- projects
-- ============================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text not null,
  cost text not null,
  year text not null,
  category text not null check (category in ('Education', 'Healthcare', 'Government', 'Industrial', 'Housing')),
  write_up text,
  -- [{ "url": "...", "alt": "...", "sortOrder": 0 }, ...] — one JSON column
  -- rather than a join table; a project's gallery is edited as a unit, not
  -- queried independently.
  images jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "projects_public_read_published" on public.projects;
create policy "projects_public_read_published"
  on public.projects for select
  to anon, authenticated
  using (published = true);

drop policy if exists "projects_admin_read_all" on public.projects;
create policy "projects_admin_read_all"
  on public.projects for select
  to authenticated
  using (true);

drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- certifications
-- ============================================================
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  abbr text not null,
  full_name text not null,
  description text,
  issuing_body text,
  scan_url text,
  expiry_date date,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.certifications enable row level security;

drop policy if exists "certifications_public_read" on public.certifications;
create policy "certifications_public_read"
  on public.certifications for select
  to anon, authenticated
  using (true);

drop policy if exists "certifications_admin_write" on public.certifications;
create policy "certifications_admin_write"
  on public.certifications for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- blog_posts
-- ============================================================
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  cover_image_url text,
  category text not null check (category in ('Company News', 'Safety', 'Projects', 'Industry')),
  excerpt text,
  body jsonb, -- Tiptap JSON document
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts_public_read_published" on public.blog_posts;
create policy "blog_posts_public_read_published"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "blog_posts_admin_read_all" on public.blog_posts;
create policy "blog_posts_admin_read_all"
  on public.blog_posts for select
  to authenticated
  using (true);

drop policy if exists "blog_posts_admin_write" on public.blog_posts;
create policy "blog_posts_admin_write"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- site_settings — singleton row (id is always 1)
-- ============================================================
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  office_address text not null default '',
  phones text[] not null default '{}',
  email text not null default '',
  whatsapp_number text not null default '',
  whatsapp_default_message text not null default '',
  -- [{ "platform": "facebook", "url": "" }, ...]
  social_links jsonb not null default '[]'::jsonb,
  -- [{ "value": "46+", "label": "contracts delivered" }, ...]
  ledger_stats jsonb not null default '[]'::jsonb,
  trust_bar_clients text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write"
  on public.site_settings for update
  to authenticated
  using (id = 1)
  with check (id = 1);

-- Seed the singleton row once. Safe to re-run (ON CONFLICT DO NOTHING) —
-- edit real values from the admin Settings screen afterwards, not here.
insert into public.site_settings (id) values (1)
  on conflict (id) do nothing;

-- ============================================================
-- inquiries — contact form submissions
-- ============================================================
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  project_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Public site visitors can submit (insert-only, no read access) —
-- 06-integrations-and-seo.md: "store submissions... surface them in a
-- simple Inquiries list in the admin panel."
drop policy if exists "inquiries_public_insert" on public.inquiries;
create policy "inquiries_public_insert"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "inquiries_admin_read" on public.inquiries;
create policy "inquiries_admin_read"
  on public.inquiries for select
  to authenticated
  using (true);

drop policy if exists "inquiries_admin_delete" on public.inquiries;
create policy "inquiries_admin_delete"
  on public.inquiries for delete
  to authenticated
  using (true);

-- ============================================================
-- updated_at triggers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.projects;
create trigger set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.certifications;
create trigger set_updated_at before update on public.certifications
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.blog_posts;
create trigger set_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.site_settings;
create trigger set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ============================================================
-- Storage buckets — public read, authenticated write
-- ============================================================
insert into storage.buckets (id, name, public)
values
  ('project-images', 'project-images', true),
  ('certification-scans', 'certification-scans', true),
  ('blog-media', 'blog-media', true)
on conflict (id) do nothing;

drop policy if exists "storage_public_read" on storage.objects;
create policy "storage_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('project-images', 'certification-scans', 'blog-media'));

drop policy if exists "storage_admin_write" on storage.objects;
create policy "storage_admin_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('project-images', 'certification-scans', 'blog-media'));

drop policy if exists "storage_admin_update" on storage.objects;
create policy "storage_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('project-images', 'certification-scans', 'blog-media'));

drop policy if exists "storage_admin_delete" on storage.objects;
create policy "storage_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('project-images', 'certification-scans', 'blog-media'));
