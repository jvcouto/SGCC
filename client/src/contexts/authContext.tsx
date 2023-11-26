import React, { createContext, useState, useContext, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { message } from "antd";
import api from "../services/request.service";
import IUser from "../types/apiResponses/users";

interface LoginDataProps {
  email: string;
  password: string;
}

interface AuthApiResponse {
  data: {
    id: string;
    name: string;
    email: string;
    roles: number[];
    token?: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  roles: number[];
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
    const { sgcc: token } = parseCookies();
    if (token) {
      api
        .get<{ data: IUser }>(`api/user/current`)
        .then((response) => {
          const { id, email, name, roles } = response.data.data;
          setUser({ id, name, email, roles });
          setIsAuthenticated(true);
        })
        .catch();
    }
  }, []);

  async function signIn(data: LoginDataProps) {
    api
      .post<AuthApiResponse>("/public/auth", data)
      .then((response) => {
        const { id, name, email, roles, token } = response.data.data;
        setCookie(undefined, "sgcc", token, {
          maxAge: 60 * 60 * 6, // 6 hour
        });
        setUser({ id, name, email, roles });

        // eslint-disable-next-line @typescript-eslint/dot-notation
        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        setIsAuthenticated(true);
        Router.push("/dashboard");
      })
      .catch((e) => {
        const { code } = e.response.data;
        switch (code) {
          case "WRONG_CREDENCIALS":
            message.error("Usuário ou senha incorretos!");
            break;

          default:
            message.error("Algo deu errado!");
            break;
        }
      });
  }

  function logOut() {
    setUser(null);
    destroyCookie(undefined, "sgcc");
    Router.push("/");
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signIn,
        user,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated, signIn, user, logOut } = context;

  return {
    isAuthenticated,
    setIsAuthenticated,
    signIn,
    user,
    logOut,
  };
};
