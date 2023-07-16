import { List } from "antd";
import styled from "styled-components";

const AlternateList = styled(List)`
  padding: 15px;
  .ant-list-item:nth-child(even) {
    .ant-card {
      background: #f0f2f5;
    }
  }

  .ant-card.selected {
    /* box-shadow: 0 0 4px 1.5px #40a9ff; */
    background: rgba(64, 169, 255, 0.5) !important;
    back
  }
`;

export default AlternateList;
