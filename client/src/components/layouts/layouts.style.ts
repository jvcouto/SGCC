import styled from "styled-components";
import { Layout } from "antd";
import Sider from "antd/lib/layout/Sider";

export const MainLayout = styled(Layout)`
  height: 100vh;
  overflow-x: hidden;
`;

export const SecondLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  overflow-y: clip;
`;

export const LayoutSider = styled(Sider)`
  overflow-y: auto;
  background: white;
`;
