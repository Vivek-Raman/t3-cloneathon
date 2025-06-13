import { Group, Input, Stack, Text } from '@mantine/core';

export default function InputBox() {
  return (
    <Stack p="md" gap={0}>
      <Group justify="space-between">
        <Text size="xs">Models</Text>
        <Text size="xs">wat</Text>
      </Group>
      <Input placeholder="Type your message..." radius="lg" size="md" />
    </Stack>
  );
}
