import { Group, Text, Title } from '@mantine/core';
import EditableDisplayName from './EditableDisplayName';

export default function NewChatWelcome() {
  return (
    <>
      <Group gap="0" justify="center" align="center">
        <Title>Hello,&nbsp;</Title>
        <EditableDisplayName />
        <Title>.</Title>
      </Group>
      <Text>What's on your mind today?</Text>
    </>
  );
}
