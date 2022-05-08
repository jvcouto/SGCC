import React from "react";
import { message } from "antd";
import Login from "../components/login/login";
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
      if (error.response.data.data?.message) {
        const { message: APIMessage } = error.response.data.data;
        message.error(APIMessage);
      } else {
        message.error(error.message);
      }
    }
  };

  const onFinishFailed = () => {
    message.error(`Algo deu errado, por favor tente novamente!`);
  };

  return <Login onFinish={onFinish} onFinishFailed={onFinishFailed} />;
}

export default Home;
