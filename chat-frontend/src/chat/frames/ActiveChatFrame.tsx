import { Text, Container, Code } from '@mantine/core';
import { useParams } from 'react-router-dom';

export default function ActiveChatFrame() {
  const { chatID } = useParams<{ chatID: string }>();

  return (
    <Container>
      {chatID ? (
        <Text>
          Currently viewing chat: <Code>{chatID}</Code>
        </Text>
      ) : (
        <Text>No chat selected. Please select a chat from the sidebar.</Text>
      )}
    </Container>
  );
}
