import { Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import InputBox from '../components/chat/InputBox';

export default function ActiveChatFrame() {
  const { chatID } = useParams<{ chatID: string }>();

  if (!chatID) {
    // TODO: center and style
    return <InputBox />;
  }

  return (
    <Stack mih="100%" justify="flex-end" mt="auto">
      <div>Message 1: Hello!</div>
      <div>Message 1: Hello!</div>
      <div>Message 1: Hello!</div>
      <div>Message 1: Hello!</div>
      <div>Message 1: Hello!</div>
      <div>Message 2: How are you?</div>
      <div>Message 2: How are you?</div>
      <div>Message 2: How are you?</div>
      <div>Message 2: How are you?</div>
      <div>Message 3: This is a test message.</div>
      <div>Message 4: Another message here.</div>
      <div>Message 4: Another message here.</div>
      <div>Message 4: Another message here.</div>
      <div>Message 4: Another message here.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
      <div>Message 5: Last dummy message.</div>
    </Stack>
  );
}
