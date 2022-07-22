import styled from "styled-components";
import { Form, Typography } from "antd";

export const LoginBox = styled.div`
  background: rgba(134, 138, 143, 0.4);
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 720px;

  div.box-top-login {
    background: rgba(3, 8, 82, 0.9);
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    height: 7rem;
    max-width: 27rem;
    width: 22vw;
    min-width: 22rem;
    display: flex;
    justify-content: center;
  }

  div.box-top-register {
    background: rgba(3, 8, 82, 0.9);
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    height: 6rem;
    max-width: 27rem;
    width: 22vw;
    min-width: 22rem;
    padding: 1.5rem;
  }
`;

export const form = styled(Form)`
  background: rgba(225, 228, 230, 0.9);
  max-width: 27rem;
  width: 22vw;
  min-width: 22rem;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
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

  div.ant-form-item:first-child:not(.teste) {
    margin-top: 3rem;
  }

  div.ant-select {
    .ant-select-selector {
      border-radius: 10px;
    }
  }
`;

export const typography = styled(Typography)`
  text-align: center;
  /* color: ${(props) => props.theme.colors.secondary}; */
  margin-top: 1rem;
`;
