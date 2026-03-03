import { createContext, useContext, useState } from "react";
import {
  getToken,
  getUserFromToken,
  removeToken,
  saveToken,
  type UserPayload,
} from "../Utils/Auth";

interface AuthContextType {
  user: UserPayload | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [user, setUser] = useState<UserPayload | null>(getUserFromToken());

  const login = (token: string) => {
    saveToken(token);
    setIsAuthenticated(true);
    setUser(getUserFromToken());
  };
  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
