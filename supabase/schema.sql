-- Conclave AI: Supabase schema (Step 3). Run in the Supabase SQL editor.

create table if not exists projects (
  slug            text primary key,
  title           text not null,
  summary         text not null,
  tags            text[] not null default '{}',
  stack           text[] not null default '{}',
  cover_video_url text,
  gallery         text[] not null default '{}',
  body            text not null default '',
  results         jsonb not null default '[]',
  role            text not null default '',
  featured        boolean not null default false,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now()
);

create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  needs       text[] not null default '{}',
  budget      text,
  message     text,
  source      text not null default 'contact',
  created_at  timestamptz not null default now()
);

create table if not exists scores (
  id          uuid primary key default gen_random_uuid(),
  handle      text not null check (char_length(handle) between 1 and 20),
  score       int not null check (score >= 0),
  created_at  timestamptz not null default now()
);
create index if not exists scores_score_idx on scores (score desc);

-- Row level security: public can read projects and top scores; only the API (service role) writes leads and scores.
alter table projects enable row level security;
alter table leads    enable row level security;
alter table scores   enable row level security;

create policy "projects are public" on projects for select using (true);
create policy "scores are public"   on scores   for select using (true);
-- No policies on leads: anon cannot read or write. FastAPI uses the service role key.

-- Storage: create a public bucket named "media" for project videos and images.
