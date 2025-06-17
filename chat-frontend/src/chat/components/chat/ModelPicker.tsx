import { Modal, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type LangModel } from '../../../utils/db';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { SelectedModelContext } from '../../context/model/SelectedModelContext';

export default function ModelPicker() {
  const [opened, { open, close }] = useDisclosure(false);
  const { selectedModel, setSelectedModel } = useContext(SelectedModelContext);

  const query = async () => {
    const models = await db.langModel.where('enabled').equals(1).toArray();
    const groupedModels = models.reduce(
      (acc, model) => {
        if (!acc[model.provider]) {
          acc[model.provider] = [];
        }
        acc[model.provider].push(model);
        return acc;
      },
      {} as Record<string, LangModel[]>,
    );
    return groupedModels;
  };
  const modelsByProvider: Record<string, LangModel[]> = useLiveQuery(query) ?? ({} as Record<string, LangModel[]>);

  const selectModel = (model: LangModel) => {
    setSelectedModel(model);
    db.userConfig.put({ key: 'selectedModelID', value: model.id });
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Pick a model">
        <Stack>
          {Object.entries(modelsByProvider).map(([provider, models]) => (
            <div key={provider}>
              <Title order={5}>{provider}</Title>
              {models.map(model => (
                <UnstyledButton key={model.id} onClick={() => selectModel(model)}>
                  {model.display_name}
                </UnstyledButton>
              ))}
            </div>
          ))}
        </Stack>
      </Modal>
      <UnstyledButton onClick={open}>
        <Text size="sm">{selectedModel?.display_name ?? 'Pick a model'}</Text>
      </UnstyledButton>
    </>
  );
}
