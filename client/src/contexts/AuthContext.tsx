import React, { createContext, useState, useContext, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import api from "../services/api";

interface LoginDataProps {
  email: string;
  password: string;
}

interface AuthApiResponse {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    token?: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  signIn(data: LoginDataProps): Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  logOut(): void;
}

export const AuthContext = createContext({} as AuthContextType);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { "PCA-Token": token } = parseCookies();
    if (token) {
      api.get<AuthApiResponse>(`/user?token=${token}`).then((response) => {
        const { id, email, name, role } = response.data.data;
        setUser({ id, name, email, role });
        setIsAuthenticated(true);
      });
    }
  }, []);

  async function signIn(data: LoginDataProps) {
    const response = await api.post<AuthApiResponse>("/auth", data);
    const { id, name, email, role, token } = response.data.data;
    setCookie(undefined, "PCA-Token", token, {
      maxAge: 60 * 60 * 6, // 6 hour
    });
    setUser({ id, name, email, role });

    // eslint-disable-next-line @typescript-eslint/dot-notation
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setIsAuthenticated(true);
    Router.push("/teacher");
  }

  function logOut() {
    setUser(null);
    Router.push("/");
    destroyCookie(undefined, "PCA-Token");
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isAuthenticated, setIsAuthenticated, signIn, user, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated, signIn, user, logOut } = context;
  return { isAuthenticated, setIsAuthenticated, signIn, user, logOut };
};
