import { Button, Group, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { db, type LangModel } from '../../../../../utils/db';
import Icon from '../../../Icon';

interface OllamaSettings {
  endpoint: string;
}

export default function OllamaConfig() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OllamaSettings>({
    initialValues: {
      endpoint: 'http://localhost:11434',
    },
    validate: {
      endpoint: (value: string) => {
        if (!value) return 'Endpoint is required';
        try {
          new URL(value);
          return null;
        } catch {
          return 'Please enter a valid URL';
        }
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const { endpoint } = values;
      const response = await fetch(`${endpoint}/v1/models`);
      if (!response.ok) {
        throw new Error('Connection failed');
      }
      const responseData = await response.json();
      const models = responseData.data.map(
        (model: { id: string }) =>
          ({
            id: `ollama-${model.id}`,
            name: model.id,
            provider: 'ollama',
            capabilities: [],
            enabled: true,
            api_key: 'ollama',
          }) as LangModel,
      ) as LangModel[];

      await db.langModel.bulkPut(models);

      notifications.show({
        icon: <Icon icon="simple-icons:ollama" />,
        title: 'Successfully connected to Ollama',
        message: `Registered models: ${models.map(model => model.name).join(', ')}`,
        color: 'green',
      });
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to save settings',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="API Endpoint"
          placeholder="http://localhost:11434"
          description="The URL where your Ollama instance is running"
          required
          {...form.getInputProps('endpoint')}
        />

        <Group>
          <Button type="submit" loading={isLoading}>
            Save Settings
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
