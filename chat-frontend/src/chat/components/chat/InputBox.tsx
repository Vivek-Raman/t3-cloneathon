import { Group, Input, Stack } from '@mantine/core';
import ModelPicker from './ModelPicker';

export default function InputBox() {
  return (
    <Stack px="xl" py="md" gap={0}>
      <Group justify="space-between">
        <ModelPicker />
      </Group>
      <Input placeholder="Type your message..." radius="lg" size="md" />
    </Stack>
  );
}
