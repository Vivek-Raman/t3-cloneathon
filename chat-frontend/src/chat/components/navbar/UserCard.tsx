import { Avatar, Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SignIn from '../auth/SignIn';

export default function UserCard() {
  const user = null;
  const [opened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure();

  return (
    <>
      <Modal opened={opened} onClose={closeAuthModal} centered withCloseButton={false}>
        <SignIn />
      </Modal>
      <UnstyledButton onClick={openAuthModal}>
        <Group>
          <Avatar src={user?.avatar} />
          <Text>{user?.name ?? 'Guest user'}</Text>
        </Group>
      </UnstyledButton>
    </>
  );
}
