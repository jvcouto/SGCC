import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { ReactElement } from "react";
import * as S from "./layouts.style";

interface SecondLayoutProps {
  children: ReactElement;
  siderContent?: ReactElement;
}

// eslint-disable-next-line react/prop-types
function SecondLayout({ children, siderContent }: SecondLayoutProps) {
  return (
    <S.SecondLayout>
      {siderContent && (
        <S.LayoutSider width={300}>{siderContent}</S.LayoutSider>
      )}
      <Layout style={{ padding: "24px 24px 0px 24px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Semestre</Breadcrumb.Item>
          <Breadcrumb.Item>Minha Conta</Breadcrumb.Item>
          <Breadcrumb.Item>Alterar email</Breadcrumb.Item>
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

SecondLayout.defaultProps = {
  siderContent: null,
};

export default SecondLayout;
