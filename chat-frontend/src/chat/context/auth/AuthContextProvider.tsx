import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import supabase from '../../../utils/supabase';
import type { User } from '@supabase/supabase-js';

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>('guest');

  useEffect(() => {
    (async () => {
      const userResponse = await supabase.auth.getUser();
      setAuthUser(userResponse.data.user);
      setDisplayName(userResponse.data.user?.user_metadata.name?.split(' ')?.at(0) ?? 'guest');
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        displayName,
        setDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
