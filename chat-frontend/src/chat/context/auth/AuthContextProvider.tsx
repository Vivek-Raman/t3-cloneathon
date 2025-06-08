import AuthContext from './AuthContext';

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  // const [user, setUser] = useState<User | null>(null);

  return <AuthContext.Provider value={{ user: null }}>{children}</AuthContext.Provider>;
}
