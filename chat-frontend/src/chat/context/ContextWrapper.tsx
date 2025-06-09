import AuthContextProvider from './auth/AuthContextProvider';

export default function ContextWrapper({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
