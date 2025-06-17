import { ActionIcon, Group, Title, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import Icon from '../Icon';

interface EditableTextProps {
  onChange: (value: string) => void;
  initialValue: string;
}

export default function EditableText(props: EditableTextProps) {
  const { onChange, initialValue } = props;

  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue);

  const handleSave = () => {
    onChange(value);
    setEditing(false);
  };

  const handleCancel = () => {
    setValue(initialValue);
    setEditing(false);
  };

  if (editing) {
    return (
      <Group gap="0" align="center">
        <TextInput
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSave();
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          onFocus={e => {
            const handleClickOutside = (event: MouseEvent) => {
              if (!(e.currentTarget?.contains(event.target as Node) ?? false)) {
                handleCancel();
                document.removeEventListener('mousedown', handleClickOutside);
              }
            };
            document.addEventListener('mousedown', handleClickOutside);
          }}
          autoFocus
          rightSection={
            <ActionIcon variant="subtle" onClick={handleSave}>
              <Icon icon="mdi:check" size="1.5rem" />
            </ActionIcon>
          }
          style={{ flex: 1 }}
        />
      </Group>
    );
  }

  return (
    <Group gap="xs" onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
      <Title>
        <Text gradient={{ from: 'pink', to: 'blue' }} variant="gradient" inherit>
          {initialValue}
        </Text>
      </Title>
    </Group>
  );
}
