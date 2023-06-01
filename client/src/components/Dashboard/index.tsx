import React from "react";
import { Layout, Menu, Button } from "antd";
import Link from "next/link";

import Image from "next/image";

import * as S from "../../styles/dashboard.style";
import { useAuth } from "../../contexts/authContext";

interface TeacherDashboardProps {
  pages: {
    label: string;
    path: string;
    key: string;
  }[];
  children: any;
  selectedKey: string;
}

const { Header, Footer } = Layout;

// eslint-disable-next-line react/prop-types
function Dashboard(props: TeacherDashboardProps) {
  const { children, pages, selectedKey } = props;

  const { logOut } = useAuth();

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
          defaultSelectedKeys={[`${selectedKey}`]}
        >
          {pages.map((e) => (
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
            <Button ghost style={{ border: "transparent" }} onClick={logOut}>
              <Image src="/logout.png" height="25" width="25" />
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
        PCA ©2022 Created by jvcouto
      </Footer>
    </S.MainLayout>
  );
}

export default Dashboard;
