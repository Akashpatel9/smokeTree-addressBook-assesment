import React, {createContext, useContext, useState, ReactNode} from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    if (!user) {
      console.error('Failed to save user: User data is undefined');
      return;
    }
    setUser(user);
  };

  const deleteUser = () => {
    setUser(null);
  };

  const value = {user, saveUser, deleteUser};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
