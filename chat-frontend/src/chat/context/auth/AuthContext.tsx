import { createContext } from 'react';
import type { User } from '@supabase/supabase-js';

type AuthContextType = {
  displayName: string;
  setDisplayName: (displayName: string) => void;
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  displayName: '',
  setDisplayName: () => {},
  authUser: null,
  setAuthUser: () => {},
});

export default AuthContext;
