import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import supabase from '../../../utils/supabase';
import type { User } from '@supabase/supabase-js';

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const userResponse = await supabase.auth.getUser();
      setAuthUser(userResponse.data.user);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
