import React from "react";
import { parseCookies } from "nookies";

import { message } from "antd";
import { AxiosError } from "axios";
import Dashboard from "../../../components/Dashboard";
import TeacherDashboard from "../../../components/Dashboard/secondLayout";
import TeacherPages from "../../../config/teacherPages";
import siderItensTeacherMain from "../../../config/mainTeacherSubMenu";
import ChangePassowordForm from "../../../components/Dashboard/Teacher/Main/PasswordForm";

import api from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

interface ChangePassWordFormData {
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
}

interface APIReponseData {
  data: { message?: string };
}

function TeacherPage() {
  const { user } = useAuth();
  const onFinish = async (data: ChangePassWordFormData) => {
    api
      .patch(`teacher/${user.id}`, data)
      .then(() => {
        message.success(`Senha alterada com sucesso!`);
      })
      .catch((error: AxiosError<APIReponseData>) => {
        const { message: APIMessage } = error.response.data.data;
        message.error(APIMessage);
      });
  };

  const onFinishFailed = () => {
    message.error(`Algo deu errado, por favor tente novamente!`);
  };

  return (
    <Dashboard pages={TeacherPages} selectedKey="tab-1">
      <TeacherDashboard
        siderItens={siderItensTeacherMain}
        selectedKey="subKeyOption-2"
        selectOpenKey="subKey-2"
      >
        <ChangePassowordForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </TeacherDashboard>
    </Dashboard>
  );
}

export default TeacherPage;

export async function getServerSideProps(ctx: any) {
  const { "PCA-Token": token } = parseCookies(ctx);

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
