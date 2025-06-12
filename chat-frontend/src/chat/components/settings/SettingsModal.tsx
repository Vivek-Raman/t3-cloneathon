import { Avatar, Button, Group, Stack, Tabs, Text } from '@mantine/core';
import { useContext } from 'react';
import supabase from '../../../utils/supabase';
import AuthContext from '../../context/auth/AuthContext';
import SignIn from '../auth/SignIn';
import Providers from './panels/Providers';
import Appearance from './panels/Appearance';

export default function SettingsModal() {
  const { authUser, setAuthUser } = useContext(AuthContext);

  const doSignOut = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  // logged out
  if (!authUser) {
    return <SignIn />;
  }

  // logged in
  return (
    <Stack>
      <Group align="center" justify="space-between">
        <Group>
          <Avatar src={authUser?.user_metadata.avatar_url} />
          <Text>{authUser?.user_metadata.name ?? 'Guest user'}</Text>
        </Group>
        <Button variant="outline" color="red" onClick={doSignOut}>
          Sign out
        </Button>
      </Group>
      <Tabs defaultValue="providers">
        <Tabs.List>
          <Tabs.Tab value="providers">Providers</Tabs.Tab>
          <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
          <Tabs.Tab value="sync">Sync</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="providers" pt="xs">
          <Providers />
        </Tabs.Panel>

        <Tabs.Panel value="appearance" pt="xs">
          <Appearance />
        </Tabs.Panel>

        <Tabs.Panel value="sync" pt="xs">
          Sync tab content
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
