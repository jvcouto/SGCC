import React from "react";
import { message } from "antd";
import { parseCookies } from "nookies";
import Login from "../components/login/loginForm";
import { useAuth } from "../contexts/authContext";
import api from "../services/request.service";

interface LoginFormData {
  email: string;
  password: string;
  semester: number;
}

function LoginPage() {
  const { signIn } = useAuth();
  const onFinish = async (values: LoginFormData) => {
    await signIn(values);
  };

  const onFinishFailed = () => {
    message.error(`Algo deu errado, por favor tente novamente!`);
  };

  return <Login onFinish={onFinish} onFinishFailed={onFinishFailed} />;
}

export async function getServerSideProps(ctx: any) {
  const { sgcc: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default LoginPage;
