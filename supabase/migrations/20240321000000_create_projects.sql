-- Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create project_members junction table
create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('viewer', 'editor', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(project_id, user_id)
);

-- Enable RLS
alter table public.projects enable row level security;
alter table public.project_members enable row level security;

-- Create policies for projects
create policy "Users can view their own projects"
  on public.projects for select
  using (
    auth.uid() = owner_id
    or exists (
      select 1 from public.project_members
      where project_id = id
      and user_id = auth.uid()
    )
  );

create policy "Users can create their own projects"
  on public.projects for insert
  with check (auth.uid() = owner_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = owner_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = owner_id);

-- Create policies for project_members
create policy "Users can view project members"
  on public.project_members for select
  using (
    exists (
      select 1 from public.projects
      where id = project_id
      and (
        owner_id = auth.uid()
        or exists (
          select 1 from public.project_members
          where project_id = id
          and user_id = auth.uid()
        )
      )
    )
  );

create policy "Project owners can manage members"
  on public.project_members for all
  using (
    exists (
      select 1 from public.projects
      where id = project_id
      and owner_id = auth.uid()
    )
  );

-- Create updated_at triggers
create trigger handle_projects_updated_at
  before update on public.projects
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_project_members_updated_at
  before update on public.project_members
  for each row
  execute procedure public.handle_updated_at();

-- Create function to check if user has access to project
create or replace function public.has_project_access(project_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.projects
    where id = project_id
    and (
      owner_id = auth.uid()
      or exists (
        select 1 from public.project_members
        where project_id = id
        and user_id = auth.uid()
      )
    )
  );
end;
$$ language plpgsql security definer;

-- Create indexes for better performance
create index project_members_project_id_idx on public.project_members(project_id);
create index project_members_user_id_idx on public.project_members(user_id);
