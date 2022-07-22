import React from "react";
import { message } from "antd";
import { parseCookies } from "nookies";
import Login from "../components/Login/login";
import { useAuth } from "../contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

function Home() {
  const { signIn } = useAuth();
  const onFinish = async (values: LoginFormData) => {
    try {
      await signIn(values);
    } catch (error) {
      const errors = error.response.data?.data;
      Object.keys(error.response.data?.data).forEach((e) => {
        message.error(`${JSON.stringify(errors[e])}`);
      });
    }
  };

  const onFinishFailed = () => {
    message.error(`Algo deu errado, por favor tente novamente!`);
  };

  return <Login onFinish={onFinish} onFinishFailed={onFinishFailed} />;
}

export async function getServerSideProps(ctx: any) {
  const { "PCA-Token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/teacher",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default Home;
