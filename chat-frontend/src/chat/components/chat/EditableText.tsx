import { Input, ActionIcon, Group, Transition, Flex } from '@mantine/core';
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
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
      <Group gap="xs" align="center" style={{ display: 'inline-block' }}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSave();
            } else if (e.key === 'Escape') {
              handleCancel();
            }
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
    <Group
      gap="xs"
      onClick={() => setEditing(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer', display: 'inline-block' }}
    >
      <div style={{ display: 'inline-block' }}>{initialValue}</div>
      <Transition mounted={isHovered} transition="fade-right" duration={200}>
        {styles => (
          <ActionIcon variant="subtle" style={styles}>
            <Icon icon="tabler:pencil" />
          </ActionIcon>
        )}
      </Transition>
    </Group>
  );
}
