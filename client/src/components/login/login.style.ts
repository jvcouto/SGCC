import styled from "styled-components";
import { Form, Typography } from "antd";

export const LoginBox = styled.div`
  background-image: linear-gradient(
    to top right,
    ${(props) => props.theme.colors.third},
    ${(props) => props.theme.colors.primary}
  );
  flex-direction: "column";
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const form = styled(Form)`
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.8);
  max-width: 27rem;
  width: 22vw;
  min-width: 22rem;
  border-radius: 30px;
  padding: 4rem;
  align-items: center;

  button.ant-btn {
    border-radius: 10px;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    min-width: 15rem;
    flex: 1;
  }

  input.ant-input:not(#basic_password):not(#basic_repeatPassword) {
    border-radius: 10px;
  }

  div.ant-form-item {
    min-width: 15rem;
    flex: 1;
  }

  div.ant-select {
    .ant-select-selector {
      border-radius: 10px;
    }
  }
`;

export const typography = styled(Typography)`
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  margin-top: 1rem;
`;
