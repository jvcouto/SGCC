import styled from "styled-components";
import { Layout } from "antd";
import Sider from "antd/lib/layout/Sider";

export const MainLayout = styled(Layout)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const SecondLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  overflow-y: clip;
`;

export const LayoutSider = styled(Sider)`
  display: flex;
  flex-direction: column;
  overflow-y: clip;
  background: white;
`;
