import { Accordion, Group, Title } from '@mantine/core';
import Icon from '../../Icon';
import OllamaConfig from './providers/OllamaConfig';
import OpenAIConfig from './providers/OpenAIConfig';
import AnthropicConfig from './providers/AnthropicConfig';

export default function Providers() {
  return (
    <Accordion variant="filled" defaultValue="ollama" w="100%">
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

      <Accordion.Item value="openai">
        <Accordion.Control>
          <Group align="center" gap="xs">
            <Icon icon="simple-icons:openai" />
            <Title order={3}>OpenAI</Title>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <OpenAIConfig />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="anthropic">
        <Accordion.Control>
          <Group align="center" gap="xs">
            <Icon icon="simple-icons:anthropic" />
            <Title order={3}>Anthropic</Title>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <AnthropicConfig />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
