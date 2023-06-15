import styled from "styled-components";
import { Content } from "antd/lib/layout/layout";

const PageContent = styled(Content)`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* min-height: 280; */
  height: 100%;
  background: white;
  overflow-y: auto;
`;

export default PageContent;
