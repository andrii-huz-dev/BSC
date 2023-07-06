import React, { useContext, useState, PropsWithChildren } from 'react';
import { AuthProviderType } from './types';

const Auth = React.createContext<AuthProviderType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(Auth);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <Auth.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </Auth.Provider>
  );
};
