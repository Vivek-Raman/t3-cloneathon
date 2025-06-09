import { createContext } from 'react';
import type { User } from '@supabase/supabase-js';

type AuthContextType = {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
});

export default AuthContext;
