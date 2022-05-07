import React from "react";
import { message } from "antd";
import { AxiosError } from "axios";

import Register from "../../components/login/register";
import api from "../../services/api";

interface APIReponseData {
  message?: string;
}

export interface StaticPropsType {
  courses: {
    id: number;
    name: string;
    updatedAt: Date;
    createdAt: Date;
  }[];
}

const onFinish = (values: any) => {
  api
    .post("teacher/register", {
      ...values,
    })
    .then(() => {
      message.success(`Cadastrado com sucesso!`);
    })
    .catch((error: AxiosError<APIReponseData>) => {
      const { message: APIMessage } = error.response.data;
      message.error(APIMessage);
    });
};

const onFinishFailed = () => {
  message.error(`Algo deu errado, por favor tente novamente!`);
};

function RegisterPage(props: StaticPropsType) {
  const { courses } = props;
  return (
    <Register
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      courses={courses}
    />
  );
}

export async function getStaticProps() {
  try {
    const res = await api.get("/courses");
    const courses = res.data.data;
    return {
      props: {
        courses,
      },
    };
  } catch (e) {
    // later
  }
}

export default RegisterPage;
