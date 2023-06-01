import React from "react";

import { Form, Input, Button, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import * as S from "../login.style";

interface HomeProps {
  onFinish: (values: any) => void;
  onFinishFailed: (values: any) => void;
  semesters: {
    id: number;
    code: string;
  }[];
}

function Login(props: HomeProps) {
  const { onFinish, onFinishFailed, semesters } = props;

  return (
    <S.LoginBox>
      <div className="box-top-login">
        <Image src="/logo.png" height="200" width="260" layout="fixed" />
      </div>

      <S.form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark="optional"
      >
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
          rules={[{ required: true, message: "Insira sua senha!" }]}
        >
          <Input.Password
            placeholder="Insira sua senha"
            style={{ borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item
          labelAlign="left"
          name="semester"
          rules={[{ required: true, message: "Selecione o semestre!" }]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Selecione o semestre"
            allowClear
            options={semesters.map((e) => ({ value: e.id, label: e.code }))}
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex" }}>
            <Button type="primary" htmlType="submit">
              Entrar
            </Button>
          </div>
        </Form.Item>
        <S.typography>
          Não possui conta? <Link href="/register">Registre-se</Link>
        </S.typography>
      </S.form>
    </S.LoginBox>
  );
}

export default Login;
