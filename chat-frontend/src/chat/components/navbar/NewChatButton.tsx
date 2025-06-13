import { ActionIcon } from '@mantine/core';
import Icon from '../Icon';
import { useNavigate } from 'react-router-dom';

interface NewChatButtonProps {
  closeNavFn: () => void;
}

export default function NewChatButton(props: NewChatButtonProps) {
  const { closeNavFn } = props;
  const navigate = useNavigate();

  const createNewChat = () => {
    navigate('/', {});
    closeNavFn();
  };

  return (
    <ActionIcon onClick={createNewChat}>
      <Icon icon="mdi:plus" />
    </ActionIcon>
  );
}
