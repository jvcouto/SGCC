import { Form, Input, Button, message } from "antd";
import React from "react";
import PageContent from "../../../../../styles/content.style";

import PasswordForm from "./password.style";

interface ChangePassowordFormProps {
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
}

function ChangePassowordForm(props: ChangePassowordFormProps) {
  const { onFinish, onFinishFailed } = props;

  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    if (values.newPassword !== values.newPasswordRepeat) {
      return message.error("Senhas nao conferem");
    }
    onFinish(values);
    form.resetFields();
  };

  return (
    <PageContent>
      <PasswordForm
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Senha atual"
          name="password"
          rules={[
            { required: true, message: "Por favor insira sua senha atual!" },
          ]}
        >
          <Input.Password placeholder="Insira sua senha atual" />
        </Form.Item>

        <Form.Item
          label="Nova senha"
          name="newPassword"
          rules={[
            { required: true, message: "Por favor insira sua senha!" },
            { min: 8, message: "Senha deve possuir no mínimo 8 caracteres" },
          ]}
        >
          <Input.Password placeholder="Insira sua nova senha" />
        </Form.Item>

        <Form.Item
          label="Repetir a senha"
          name="newPasswordRepeat"
          rules={[
            {
              required: true,
              message: "Por favor insira sua senha novamente!",
            },
            { min: 8, message: "Senha deve possuir no mínimo 8 caracteres" },
          ]}
        >
          <Input.Password placeholder="Insira sua nova senha" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex" }}>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </div>
        </Form.Item>
      </PasswordForm>
    </PageContent>
  );
}

export default ChangePassowordForm;
