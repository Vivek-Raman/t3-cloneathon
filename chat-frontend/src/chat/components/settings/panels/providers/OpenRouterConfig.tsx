import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { db, type LangModel } from '../../../../../utils/db';
import Icon from '../../../Icon';

interface OpenRouterSettings {
  apiKey: string;
}

export default function OpenRouterConfig() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OpenRouterSettings>({
    initialValues: {
      apiKey: '',
    },
    validate: {
      apiKey: (value: string) => {
        if (!value) return 'API Key is required';
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const { apiKey } = values;
      const response = await fetch(`https://openrouter.ai/api/v1/models`);
      if (!response.ok) {
        throw new Error('Connection failed');
      }
      const responseData = await response.json();
      const models = responseData.data.map((model: any) => {
        const price = Object.values(model.pricing)
          .map((e: any) => parseFloat(e) ?? 1.0)
          .reduce((a, b) => a + b, 0);
        return {
          id: model.id,
          display_name: model.name,
          provider: model.id.split('/')[0] ?? 'unknown',
          name: model.id.split('/')[1] ?? 'unknown',
          price: price,
          enabled: price <= 0 ? 1 : 0,
          api_key: apiKey,
        } as LangModel;
      }) as LangModel[];

      await db.langModel.bulkPut(models);

      notifications.show({
        icon: <Icon icon="custom:openrouter" />,
        title: 'Connection to OpenRouter successful',
        message: `Registered ${models.length} models.`,
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
          type="password"
          label="API Key"
          placeholder="sk-or-v1-..."
          description="The API Key for your OpenRouter account"
          required
          {...form.getInputProps('apiKey')}
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
