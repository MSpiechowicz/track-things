-- Drop existing triggers and functions if they exist
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists public.handle_updated_at();

-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Create profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create account_settings table
create table if not exists public.account_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint account_settings_user_id_key unique (user_id)
);

-- Enable RLS for settings
alter table public.account_settings enable row level security;

-- Create settings policies
create policy "Users can view their own settings"
  on public.account_settings for select
  using (auth.uid() = user_id);

create policy "Users can update their own settings"
  on public.account_settings for update
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on public.account_settings for insert
  with check (auth.uid() = user_id);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers for updated_at
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_settings_updated_at
  before update on public.account_settings
  for each row
  execute procedure public.handle_updated_at();

-- Create function to handle new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Insert into profiles with all fields
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'email',
    new.raw_user_meta_data->>'avatar_url'
  );

  -- Insert into account_settings
  insert into public.account_settings (user_id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
