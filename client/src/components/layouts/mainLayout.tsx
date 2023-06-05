import React, { useEffect, useState } from "react";
import { Layout, Menu, Button } from "antd";
import Link from "next/link";
import Image from "next/image";

import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import api from "../../services/request.service";

import { getDefaultUserPage, getRolePages, getSelectedKey } from "./pages";

import * as S from "./layouts.style";
import { useAuth } from "../../contexts/authContext";

const { Header, Footer } = Layout;
interface User {
  id: number;
  name: string;
  email: string;
  roles: number[];
}

interface AuthApiResponse {
  data: {
    id: number;
    name: string;
    email: string;
    roles: number[];
    token: string;
    semester: number;
  };
}

// eslint-disable-next-line react/prop-types
function MainLayout({ children }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { user } = useAuth();
  const { asPath } = useRouter();

  const handleclick = () => {
    console.log(asPath);
  };

  useEffect(() => {
    api.get<AuthApiResponse>(`api/user/current`).then((response) => {
      const { id, email, name, roles } = response.data.data;
      setCurrentUser({ id, name, email, roles });
    });
  }, []);

  return (
    <S.MainLayout>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "0px 0px",
        }}
      >
        <div>
          <Image src="/logo.png" height="60" width="80" layout="fixed" />
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[getSelectedKey(asPath.split("/")[2])]}
        >
          {getRolePages(currentUser?.roles).map((e) => (
            <Menu.Item key={e.key}>
              <Link href={e.path}>{e.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 0.5rem 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              ghost
              style={{ border: "transparent" }}
              onClick={handleclick}
            >
              <LogoutOutlined />
            </Button>
          </div>
        </div>
      </Header>
      {children}
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        SGCC ©{new Date().getFullYear()} Created by jvcouto
      </Footer>
    </S.MainLayout>
  );
}

export default MainLayout;
