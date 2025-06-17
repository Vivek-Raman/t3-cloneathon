import { ActionIcon, Group, Title, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import Icon from '../Icon';
import AuthContext from '../../context/auth/AuthContext';

export default function EditableDisplayName() {
  const { displayName, setDisplayName } = useContext(AuthContext);

  const [editing, setEditing] = useState<boolean>(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      newDisplayName: displayName,
    },
  });

  const handleSave = (values: typeof form.values) => {
    setDisplayName(values.newDisplayName);
    setEditing(false);
  };

  const handleCancel = () => {
    form.resetDirty();
    setEditing(false);
  };

  useEffect(() => {
    form.setValues({ newDisplayName: displayName });
  }, [displayName]);

  if (editing) {
    return (
      <form onSubmit={form.onSubmit(handleSave)}>
        <Group gap="0" align="center">
          <TextInput
            {...form.getInputProps('newDisplayName')}
            onBlur={handleCancel}
            autoFocus
            autoComplete="off"
            rightSection={
              <ActionIcon variant="subtle" type="submit">
                <Icon icon="mdi:check" size="1.5rem" />
              </ActionIcon>
            }
            style={{ flex: 1 }}
          />
        </Group>
      </form>
    );
  }

  return (
    <Title onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
      <Text gradient={{ from: 'pink', to: 'blue' }} variant="gradient" inherit>
        {displayName}
      </Text>
    </Title>
  );
}
