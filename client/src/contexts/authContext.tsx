import React, { createContext, useState, useContext, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import api from "../services/request.service";

interface LoginDataProps {
  email: string;
  password: string;
  semester: number;
}

interface AuthApiResponse {
  data: {
    id: number;
    name: string;
    email: string;
    roles: string[];
    token?: string;
    semester: number;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  signIn(data: LoginDataProps): Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  logOut(): void;
  selectedSemester: number;
}

export const AuthContext = createContext({} as AuthContextType);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  useEffect(() => {
    const { sggc: token } = parseCookies();
    if (token) {
      api
        .get<AuthApiResponse>(`api/user/current`)
        .then((response) => {
          const { id, email, name, roles, semester } = response.data.data;
          setUser({ id, name, email, roles });
          setIsAuthenticated(true);
          setSelectedSemester(semester);
        })
        .catch();
    }
  }, []);

  async function signIn(data: LoginDataProps) {
    api
      .post<AuthApiResponse>("/public/auth", data)
      .then((response) => {
        const { id, name, email, roles, token, semester } = response.data.data;
        setCookie(undefined, "sgcc", token, {
          maxAge: 60 * 60 * 6, // 6 hour
        });
        setUser({ id, name, email, roles });

        // eslint-disable-next-line @typescript-eslint/dot-notation
        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        setIsAuthenticated(true);
        setSelectedSemester(semester);
        Router.push("/dashboard");
      })
      .catch();
  }

  function logOut() {
    setUser(null);
    setSelectedSemester(null);
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
        selectedSemester,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const {
    isAuthenticated,
    setIsAuthenticated,
    signIn,
    user,
    logOut,
    selectedSemester,
  } = context;
  return {
    isAuthenticated,
    setIsAuthenticated,
    signIn,
    user,
    logOut,
    selectedSemester,
  };
};
