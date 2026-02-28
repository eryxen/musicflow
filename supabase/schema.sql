-- MusicFlow Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users profile (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  avatar_url text,
  subscription_plan text default 'free' check (subscription_plan in ('free', 'basic', 'pro')),
  storage_used bigint default 0,
  storage_limit bigint default 524288000, -- 500MB free
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Projects
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  type text not null check (type in ('separation', 'generation')),
  status text default 'processing' check (status in ('processing', 'completed', 'failed')),
  input_file_url text,
  input_file_name text,
  output_files jsonb default '{}',
  settings jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Music library
create table if not exists public.tracks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  artist text default '',
  album text,
  duration integer default 0,
  file_url text not null,
  cover_url text,
  tags text[] default '{}',
  is_favorite boolean default false,
  play_count integer default 0,
  created_at timestamptz default now()
);

-- Playlists
create table if not exists public.playlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  cover_url text,
  is_public boolean default false,
  track_ids uuid[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.tracks enable row level security;
alter table public.playlists enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Projects: users can CRUD their own projects
create policy "Users can view own projects" on public.projects for select using (auth.uid() = user_id);
create policy "Users can insert own projects" on public.projects for insert with check (auth.uid() = user_id);
create policy "Users can update own projects" on public.projects for update using (auth.uid() = user_id);
create policy "Users can delete own projects" on public.projects for delete using (auth.uid() = user_id);

-- Tracks: users can CRUD their own tracks
create policy "Users can view own tracks" on public.tracks for select using (auth.uid() = user_id);
create policy "Users can insert own tracks" on public.tracks for insert with check (auth.uid() = user_id);
create policy "Users can update own tracks" on public.tracks for update using (auth.uid() = user_id);
create policy "Users can delete own tracks" on public.tracks for delete using (auth.uid() = user_id);

-- Playlists: users can CRUD their own, public playlists are readable by all
create policy "Users can view own playlists" on public.playlists for select using (auth.uid() = user_id or is_public = true);
create policy "Users can insert own playlists" on public.playlists for insert with check (auth.uid() = user_id);
create policy "Users can update own playlists" on public.playlists for update using (auth.uid() = user_id);
create policy "Users can delete own playlists" on public.playlists for delete using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for auto profile creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage buckets
insert into storage.buckets (id, name, public)
values ('audio-uploads', 'audio-uploads', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('audio-outputs', 'audio-outputs', false)
on conflict (id) do nothing;

-- Storage policies
create policy "Users can upload audio" on storage.objects for insert
  with check (bucket_id = 'audio-uploads' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can read own uploads" on storage.objects for select
  using (bucket_id in ('audio-uploads', 'audio-outputs') and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own uploads" on storage.objects for delete
  using (bucket_id = 'audio-uploads' and auth.uid()::text = (storage.foldername(name))[1]);
