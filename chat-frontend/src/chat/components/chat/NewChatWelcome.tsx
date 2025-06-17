import { Title } from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../utils/db';
import { useCallback, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import EditableText from './EditableText';

export default function NewChatWelcome() {
  const { authUser } = useContext(AuthContext);

  const displayName = useLiveQuery(() =>
    db.userConfig
      .where('key')
      .equals('displayName')
      .first()
      .then(res => res?.value),
  );

  const getDisplayName = useCallback(() => {
    if (!authUser) return 'welcome';
    // FIXME: any user can see the previous display name
    if (displayName) {
      return displayName;
    }
    if (authUser?.user_metadata.name) {
      return authUser.user_metadata.name;
    }
    return 'welcome';
  }, [authUser, displayName]);

  const updateDisplayName = (value: string) => {
    db.userConfig.put({
      key: 'displayName',
      value,
    });
  };

  return (
    <>
      <Title style={{ display: 'inline-block' }}>
        Hello, <EditableText key={getDisplayName()} onChange={updateDisplayName} initialValue={getDisplayName()} />.
      </Title>
    </>
  );
}
