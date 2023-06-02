import React, { ReactElement } from "react";
import { parseCookies } from "nookies";

import { Button, Form, Input, message } from "antd";

import MainLayout from "../../../components/layouts/mainLayout";
import SecondLayout from "../../../components/layouts/secondLayout";

import api from "../../../services/request.service";
import { useAuth } from "../../../contexts/authContext";

import PageContent from "../../../styles/content.style";
import SForm from "./userInfoForm.style";
import SettingsSiderItens from "../../../components/siders/settings/settingsSider";

interface ChangePassWordFormData {
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
}

function ChangeUserPasswordPage() {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const onFinishFailed = () => {
    message.error(`Algo deu errado, por favor tente novamente!`);
  };

  const onFinish = async (data: ChangePassWordFormData) => {
    api.patch(`/api/user/${user.id}`, data).then(() => {
      message.success(`Senha a com sucesso!`);
    });
  };

  const handleSubmit = async (values: ChangePassWordFormData) => {
    if (values.newPassword !== values.newPasswordRepeat) {
      return message.error("Senhas não conferem, por favor tente novamente!");
    }
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
      </SForm>
    </PageContent>
  );
}

ChangeUserPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SecondLayout siderContent={<SettingsSiderItens />}>{page}</SecondLayout>
    </MainLayout>
  );
};

export default ChangeUserPasswordPage;

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
