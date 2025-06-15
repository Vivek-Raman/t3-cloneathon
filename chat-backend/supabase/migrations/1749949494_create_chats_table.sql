create table chats (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id),
  title text,
  created_at timestamptz default now()
);
alter table chats enable row level security;

create policy select_own_chats on chats for select using (owner_id = auth.uid());
create policy insert_own_chats on chats for insert with check (owner_id = auth.uid());
create policy update_own_chats on chats for update using (owner_id = auth.uid());
create policy delete_own_chats on chats for delete using (owner_id = auth.uid());
