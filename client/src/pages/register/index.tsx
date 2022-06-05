import React from "react";
import { message } from "antd";
import { AxiosError } from "axios";

import { parseCookies } from "nookies";
import Router from "next/router";
import Register from "../../components/Login/register";
import api from "../../services/api";

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
    .post("/register", {
      ...values,
      roleId: {
        id: 2,
      },
    })
    .then(() => {
      message.success(`Cadastrado com sucesso!`);
      Router.push("/");
    })
    .catch((error: AxiosError<any>) => {
      const errors = error.response.data?.data;
      Object.keys(error.response.data?.data).forEach((e) => {
        message.error(`${JSON.stringify(errors[e])}`);
      });
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
