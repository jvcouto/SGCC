import { Form, Input, Button, message } from "antd";
import React from "react";
import PageContent from "../../../../../styles/content.style";

import EmailForm from "./email.style";

interface ChangePassowordFormProps {
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
}

function ChangeEmailForm(props: ChangePassowordFormProps) {
  const { onFinish, onFinishFailed } = props;

  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <PageContent>
      <EmailForm
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Senha"
          name="password"
          rules={[
            { required: true, message: "Por favor insira sua senha atual!" },
          ]}
        >
          <Input.Password placeholder="Insira sua senha atual" />
        </Form.Item>

        <Form.Item
          label="Novo Email"
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
          <Input placeholder="Insira seu novo email" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex" }}>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </div>
        </Form.Item>
      </EmailForm>
    </PageContent>
  );
}

export default ChangeEmailForm;
