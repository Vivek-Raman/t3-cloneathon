import { Avatar, Button, Group, Stack, Tabs, Text } from '@mantine/core';
import { useContext } from 'react';
import supabase from '../../../utils/supabase';
import AuthContext from '../../context/auth/AuthContext';
import SignIn from '../auth/SignIn';
import Models from './panels/Models';
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
      <Tabs defaultValue="models">
        <Tabs.List>
          <Tabs.Tab value="models">Models</Tabs.Tab>
          <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
          <Tabs.Tab value="sync">Sync</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="models" p="md">
          <Models />
        </Tabs.Panel>

        <Tabs.Panel value="appearance" p="md">
          <Appearance />
        </Tabs.Panel>

        <Tabs.Panel value="sync" p="md">
          Sync tab content
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
