import { Button } from '@mantine/core';
import { useContext } from 'react';
import supabase from '../../../../utils/supabase';
import AuthContext from '../../../context/auth/AuthContext';
import Icon from '../../Icon';

export default function GitHubSignIn() {
  const { setAuthUser } = useContext(AuthContext);

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

  return (
    <Button
      color="dark"
      onClick={() => {
        doSignInWithGitHub();
      }}
      leftSection={<Icon icon="mdi:github" width="1.5rem" height="1.5rem" />}
    >
      Sign in with GitHub
    </Button>
  );
}
