import { Accordion, Group, Title } from '@mantine/core';
import Icon from '../../Icon';
import OllamaConfig from './providers/OllamaConfig';
import OpenRouterConfig from './providers/OpenRouterConfig';

export default function Providers() {
  return (
    <Accordion variant="filled" defaultValue="openrouter" w="100%">
      <Accordion.Item value="openrouter">
        <Accordion.Control>
          <Group align="center" gap="xs">
            <Icon icon="custom:openrouter" />
            <Title order={3}>OpenRouter</Title>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <OpenRouterConfig />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="ollama">
        <Accordion.Control>
          <Group align="center" gap="xs">
            <Icon icon="simple-icons:ollama" />
            <Title order={3}>Ollama</Title>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <OllamaConfig />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
