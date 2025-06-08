import { Button, Stack } from '@mantine/core';
import { Icon } from '@iconify/react';

export default function SignIn() {
  return (
    <Stack align="center" justify="center" h="100%">
      <Button
        color="dark"
        onClick={() => {
          console.log('sign in with github');
        }}
        leftSection={<Icon icon="mdi:github" width="1.5rem" height="1.5rem" />}
      >
        Sign in with GitHub
      </Button>
    </Stack>
  );
}
