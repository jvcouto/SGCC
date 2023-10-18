import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Space,
  Typography,
  MenuProps,
} from "antd";
import Link from "next/link";
import Image from "next/image";

import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import { getRolePages, getSelectedKey } from "./pages";

import * as S from "./layouts.style";
import { useAuth } from "../../contexts/authContext";

const { Header, Footer } = Layout;

// eslint-disable-next-line react/prop-types
function MainLayout({ children }) {
  const { logOut, user } = useAuth();
  const { asPath } = useRouter();

  const [selectedPeriod, setSelectedPeriod] = useState("Período");

  const handleclick = () => {
    logOut();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Item 1",
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    const teste = items.find((e) => e.key === key);
    setSelectedPeriod();
  };

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
          style={{ minWidth: "50rem" }}
        >
          {Array.from(getRolePages(user?.roles)).map((e: any) => (
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
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["3"],
              onClick,
            }}
          >
            <Typography.Link onClick={(e) => e.preventDefault()}>
              <Space>
                {selectedPeriod}
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <Button
              ghost
              style={{ border: "transparent" }}
              onClick={handleclick}
            >
              <LogoutOutlined />
              <span>Sair</span>
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
