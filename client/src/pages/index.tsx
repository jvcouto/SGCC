import React from "react";
import { AxiosError } from "axios";
import { message } from "antd";
import api from "../services/api";

import Login from "../components/login/login";

interface LoginFormData {
  email: string;
  password: string;
}

interface APIReponseData {
  message?: string;
}

function Home() {
  const onFinish = (values: LoginFormData) => {
    api
      .post("auth", { ...values })
      .then((response) => {
        console.log(response);

        // colocar no context de login
      })
      .catch((error: AxiosError<APIReponseData>) => {
        const { message: APIMessage } = error.response.data;
        message.error(APIMessage);
      });
  };

  const onFinishFailed = () => {
    message.error(`Algo deu errado, por favor tente novamente!`);
  };

  return <Login onFinish={onFinish} onFinishFailed={onFinishFailed} />;
}

export default Home;
