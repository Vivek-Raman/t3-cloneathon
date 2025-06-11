import { Stack } from '@mantine/core';
import GitHubSignIn from './providers/GitHubSignIn';

export default function SignIn() {
  return (
    <Stack align="center" justify="center" h="100%">
      <GitHubSignIn />
    </Stack>
  );
}
