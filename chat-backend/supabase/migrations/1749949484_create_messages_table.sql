create table messages (
  id uuid primary key default uuid_generate_v4(),
  chat_id uuid references chats(id) on delete cascade,
  sender_id uuid references profiles(id),
  model text not null, -- did not exist in the original migration
  role text not null, -- 'user', 'assistant', 'system'
  content text not null,
  created_at timestamptz default now()
);
alter table messages enable row level security;

create policy select_chat_messages on messages for select using (
  chat_id in (select id from chats where owner_id = auth.uid())
);
create policy insert_chat_messages on messages for insert with check (
  chat_id in (select id from chats where owner_id = auth.uid())
);
create policy update_own_messages on messages for update using (sender_id = auth.uid());
create policy delete_own_messages on messages for delete using (sender_id = auth.uid());
