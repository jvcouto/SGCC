import React, { createContext, useState, useContext, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import api from "../services/api";

interface LoginDataProps {
  email: string;
  password: string;
}

interface AuthApiResponse {
  data: { name: string; email: string; role: string; token?: string };
}

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  signIn(data: LoginDataProps): Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
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
        const { email, name, role } = response.data.data;
        setUser({ name, email, role });
        setIsAuthenticated(true);
      });
    }
  }, []);

  async function signIn(data: LoginDataProps) {
    const response = await api.post<AuthApiResponse>("/auth", data);
    const { name, email, role, token } = response.data.data;
    setCookie(undefined, "PCA-Token", token, {
      maxAge: 60 * 60 * 6, // 6 hour
    });
    setUser({ name, email, role });

    // eslint-disable-next-line @typescript-eslint/dot-notation
    api.defaults.headers["Authorization"] = `Baerer ${token}`;

    setIsAuthenticated(true);
    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isAuthenticated, setIsAuthenticated, signIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated, signIn, user } = context;
  return { isAuthenticated, setIsAuthenticated, signIn, user };
};
