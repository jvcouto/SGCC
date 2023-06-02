import React, { ReactElement } from "react";
import { parseCookies } from "nookies";
import { Form, Input, Button, message } from "antd";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";
import SettingsSiderItens from "../../../components/siders/settings/settingsSider";

import { useAuth } from "../../../contexts/authContext";
import api from "../../../services/request.service";

import PageContent from "../../../styles/content.style";
import SForm from "./userInfoForm.style";

interface ChangeEmailFormData {
  password: string;
  email: string;
}

function ChangeUserEmailPage() {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const onFinishFailed = () => {
    message.error(`Algo deu errado, por favor tente novamente!`);
  };

  const onFinish = async (data: ChangeEmailFormData) => {
    api.patch(`/api/user/${user.id}`, data).then(() => {
      message.success(`Email alterado com sucesso!`);
    });
  };

  const handleSubmit = async (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <PageContent>
      <SForm
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
            {
              required: true,
              message: "Por favor insira sua senha atual!",
            },
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
      </SForm>
    </PageContent>
  );
}

ChangeUserEmailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<SettingsSiderItens />}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default ChangeUserEmailPage;

export async function getServerSideProps(ctx: any) {
  const { sgcc: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/dot-notation
  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return { props: {} };
}
