import { Avatar, Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AuthModal from '../auth/AuthModal';
import { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';

export default function UserCard() {
  const { authUser } = useContext(AuthContext);
  const [opened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure();

  return (
    <>
      <Modal opened={opened} onClose={closeAuthModal} centered withCloseButton={false}>
        <AuthModal />
      </Modal>
      <UnstyledButton onClick={openAuthModal}>
        <Group>
          <Avatar src={authUser?.user_metadata.avatar_url} />
          <Text>{authUser?.user_metadata.name ?? 'Guest user'}</Text>
        </Group>
      </UnstyledButton>
    </>
  );
}
