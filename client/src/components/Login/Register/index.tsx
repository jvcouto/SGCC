import React from "react";
import { Form, Input, Button, Typography, message } from "antd";

import Link from "next/link";

import * as S from "../login.style";

interface RegisterProps {
  onFinish: (values: any) => void;
  onFinishFailed: (values: any) => void;
}

function Register(props: RegisterProps) {
  const { onFinish, onFinishFailed } = props;

  const [form] = Form.useForm();

  const { Title } = Typography;

  const handleSubmit = async (values: any) => {
    if (values.password !== values.repeatPassword) {
      return message.error("Senhas nao conferem");
    }
    onFinish(values);
    form.resetFields();
  };

  return (
    <S.LoginBox>
      <div className="box-top-register">
        <Title
          level={1}
          style={{
            color: "white",
            margin: "0 0 4rem 0 ",
            textAlign: "center",
          }}
        >
          Cadastro
        </Title>
      </div>
      <S.form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark="optional"
      >
        <Form.Item
          className="teste"
          labelAlign="left"
          name="name"
          rules={[{ required: true, message: "Insira o seu nome!" }]}
        >
          <Input placeholder="Insira seu nome" />
        </Form.Item>

        <Form.Item
          labelAlign="left"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Insira um email válido",
            },
          ]}
        >
          <Input placeholder="Insira seu email" />
        </Form.Item>

        <Form.Item
          labelAlign="left"
          name="password"
          rules={[
            { required: true, message: "Insira sua senha!" },
            { min: 8, message: "Senha deve possuir no mínimo 8 caracteres" },
          ]}
        >
          <Input.Password
            placeholder="Insira sua senha"
            style={{ borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item
          labelAlign="left"
          name="repeatPassword"
          rules={[
            { required: true, message: "Insira sua senha!" },
            { min: 8, message: "Senha deve possuir no mínimo 8 caracteres" },
          ]}
        >
          <Input.Password
            placeholder="Insira novemente sua senha"
            style={{ borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex" }}>
            <Button type="primary" htmlType="submit">
              Cadastrar
            </Button>
          </div>
        </Form.Item>
        <S.typography>
          Já possui conta? <Link href="/">Entrar</Link>
        </S.typography>
      </S.form>
    </S.LoginBox>
  );
}

export default Register;
