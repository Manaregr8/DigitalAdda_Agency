create extension if not exists "uuid-ossp";

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),

  -- Core content
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  cover_image_alt text,
  status text not null default 'draft' check (status in ('draft','published','archived')),

  -- Taxonomy
  category text,
  tags text[] default '{}',

  -- SEO
  meta_title text,
  meta_description text,
  meta_keywords text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image_url text,
  twitter_title text,
  twitter_description text,
  twitter_image_url text,
  robots_directive text default 'index, follow',

  -- Schema.org
  schema_json text,

  -- Stats
  read_time_minutes int,
  word_count int,

  -- Author
  author_name text default 'Admin',
  author_url text,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

create index if not exists blog_posts_slug_idx on blog_posts(slug);
create index if not exists blog_posts_status_idx on blog_posts(status);
create index if not exists blog_posts_published_at_idx on blog_posts(published_at desc);
