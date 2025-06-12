import { Avatar, Group, Modal, Paper, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AuthModal from '../settings/SettingsModal';
import { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import Icon from '../Icon';

export default function UserSettingsCard() {
  const { authUser } = useContext(AuthContext);
  const [opened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure();

  return (
    <>
      <Modal opened={opened} onClose={closeAuthModal} centered withCloseButton={false}>
        <AuthModal />
      </Modal>
      <UnstyledButton onClick={openAuthModal} w="100%" mx="auto" mb="md">
        <Paper withBorder shadow="md" radius="lg" p="sm">
          <Group justify="space-between">
            <Group>
              <Avatar src={authUser?.user_metadata.avatar_url} />
              <Text>{authUser?.user_metadata.name ?? 'Guest user'}</Text>
            </Group>
            <Icon icon="tabler:settings" />
          </Group>
        </Paper>
      </UnstyledButton>
    </>
  );
}
