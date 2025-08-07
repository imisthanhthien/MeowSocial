import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getUser());

  const login = async (email, password) => {
  const result = await authService.login(email, password);
  setUser(result.user); 
   return result; 
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
