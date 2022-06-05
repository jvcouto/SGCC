import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import Link from "next/link";
import * as S from "../../styles/dashboard.style";

interface TeacherDashboardProp {
  children: any;
  siderItens: MenuProps["items"];
  selectedKey: string;
  selectOpenKey: string;
}

function TeacherDashboard(props: TeacherDashboardProp) {
  const { children, siderItens, selectedKey, selectOpenKey } = props;

  return (
    <S.SecondLayout>
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={[selectOpenKey]}
          style={{ height: "100%", borderRight: 0, padding: "5px" }}
          items={siderItens}
        />
      </Sider>
      <Layout style={{ padding: "24px 24px 0px 24px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          style={{
            margin: 0,
            minHeight: 280,
            height: "100%",
          }}
        >
          {children}
        </Content>
      </Layout>
    </S.SecondLayout>
  );
}

export default TeacherDashboard;
