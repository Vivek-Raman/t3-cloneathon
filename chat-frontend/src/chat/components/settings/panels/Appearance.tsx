import { Group, SegmentedControl, Stack, Text, useMantineColorScheme } from '@mantine/core';
import Icon from '../../Icon';

export default function Appearance() {
  const scheme = useMantineColorScheme({ keepTransitions: true });

  return (
    <Stack>
      <SegmentedControl
        data={[
          {
            label: (
              <Group justify="center" gap="xs">
                <Icon icon="mdi:theme-light-dark" />
                <Text>Auto</Text>
              </Group>
            ),
            value: 'auto',
          },
          {
            label: (
              <Group justify="center" gap="xs">
                <Icon icon="mdi:weather-sunny" />
                <Text>Light</Text>
              </Group>
            ),
            value: 'light',
          },
          {
            label: (
              <Group justify="center" gap="xs">
                <Icon icon="mdi:weather-night" />
                <Text>Dark</Text>
              </Group>
            ),
            value: 'dark',
          },
        ]}
        value={scheme.colorScheme}
        onChange={value => scheme.setColorScheme(value as 'auto' | 'light' | 'dark')}
      />
    </Stack>
  );
}
