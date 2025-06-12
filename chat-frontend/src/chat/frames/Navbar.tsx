import { Stack, NavLink, Text, Group } from '@mantine/core';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import Icon from '../components/Icon';
import UserSettingsCard from '../components/navbar/UserSettingsCard';

// Example chat list - in a real app, this would come from your chat state/API
const sampleChats = [
  { id: 'chat-1', name: 'General Discussion' },
  { id: 'chat-2', name: 'Project Updates' },
  { id: 'chat-3', name: 'Random' },
];

interface NavbarProps {
  closeNavFn: () => void;
}

export default function Navbar(props: NavbarProps) {
  const location = useLocation();

  return (
    <Stack justify="space-between" h="100%" p="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="sm" fw={600} c="dimmed" tt="uppercase">
            Chats
          </Text>
        </Group>
        <Stack gap="xs">
          {sampleChats.map(chat => (
            <NavLink
              key={chat.id}
              component={RouterNavLink}
              onClick={props.closeNavFn}
              to={`/chat/${chat.id}`}
              label={chat.name}
              leftSection={<Icon icon="mdi:chat" width={16} height={16} />}
              active={location.pathname === `/chat/${chat.id}`}
              style={{
                borderRadius: '0.5rem',
              }}
            />
          ))}
        </Stack>
      </Stack>
      <UserSettingsCard />
    </Stack>
  );
}
