import { Icon } from '@iconify/react';
import { Button, Stack } from '@mantine/core';
import { useContext } from 'react';
import supabase from '../../../utils/supabase';
import AuthContext from '../../context/auth/AuthContext';
import UserCard from '../navbar/UserCard';

export default function SignIn() {
  const { authUser, setAuthUser } = useContext(AuthContext);

  const doSignInWithGitHub = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (res.error) {
      // TODO: mantine notification
      console.error(res.error);
      return;
    }

    const userResponse = await supabase.auth.getUser();
    setAuthUser(userResponse.data.user);
  };

  const doSignOut = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  // logged in
  if (authUser) {
    return (
      <Stack align="center" justify="center" h="100%">
        <UserCard />
        <Button onClick={doSignOut}>Sign out</Button>
      </Stack>
    );
  }

  // logged out
  return (
    <Stack align="center" justify="center" h="100%">
      <Button
        color="dark"
        onClick={() => {
          doSignInWithGitHub();
        }}
        leftSection={<Icon icon="mdi:github" width="1.5rem" height="1.5rem" />}
      >
        Sign in with GitHub
      </Button>
    </Stack>
  );
}
