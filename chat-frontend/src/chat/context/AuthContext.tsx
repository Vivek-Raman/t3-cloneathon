import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  // setUser: (user: User) => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);

  return <AuthContext.Provider value={{ user: null }}>{children}</AuthContext.Provider>;
};
