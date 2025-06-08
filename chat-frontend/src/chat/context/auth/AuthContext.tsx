import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  // setUser: (user: User) => {},
});

export default AuthContext;
