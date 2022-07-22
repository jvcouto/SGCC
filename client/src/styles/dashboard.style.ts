import styled from "styled-components";
import { Layout } from "antd";

export const MainLayout = styled(Layout)`
  height: 100vh;
  overflow-x: hidden;
`;

export const SecondLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  overflow-y: clip;
`;
