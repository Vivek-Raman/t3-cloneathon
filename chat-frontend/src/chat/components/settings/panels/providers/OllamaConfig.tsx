import { Button, Group, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useState } from 'react';

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
      const response = await fetch(`${endpoint}/api/tags`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        notifications.show({
          title: 'Connection successful',
          message: 'Successfully connected to Ollama',
          color: 'green',
        });
      } else {
        throw new Error('Connection failed');
      }

      localStorage.setItem('ollamaEndpoint', endpoint);
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
