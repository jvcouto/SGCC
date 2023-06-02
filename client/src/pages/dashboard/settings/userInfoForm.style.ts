import styled from "styled-components";
import { Form } from "antd";

const SForm = styled(Form)`
  max-width: 27rem;
  width: 25vw;
  min-width: 22rem;

  button.ant-btn {
    margin-top: 0.5rem;
    min-width: 15rem;
    flex: 1;
  }
`;

export default SForm;
