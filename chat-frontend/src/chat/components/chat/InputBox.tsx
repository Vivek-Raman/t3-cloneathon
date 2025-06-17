import { Group, Stack, TextInput } from '@mantine/core';
import ModelPicker from './ModelPicker';

export default function InputBox() {
  return (
    <Stack px="xl" py="md" gap={0}>
      <Group justify="space-between">
        <ModelPicker />
      </Group>
      <TextInput placeholder="Type your message..." radius="lg" size="md" />
    </Stack>
  );
}
