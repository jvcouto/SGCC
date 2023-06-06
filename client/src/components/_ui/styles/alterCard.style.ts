import { List } from "antd";
import styled from "styled-components";

const AlternateList = styled(List)`
  padding: 15px;
  .ant-list-item:nth-child(even) {
    .ant-card {
      background: #f0f2f5;
    }
  }
`;

export default AlternateList;
