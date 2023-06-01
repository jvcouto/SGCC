import React from "react";
import { message } from "antd";

import { parseCookies } from "nookies";
import Router from "next/router";
import Register from "../../components/Login/Register";
import api from "../../services/request.service";

const onFinish = (values: any) => {
  api
    .post("public/register", {
      ...values,
    })
    .then(() => {
      message.success(`Cadastro realizado com sucesso!`);
      Router.push("/");
    });
};

const onFinishFailed = () => {
  message.error(`Algo deu errado, por favor tente novamente!`);
};

function RegisterPage() {
  return <Register onFinish={onFinish} onFinishFailed={onFinishFailed} />;
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

  return { props: {} };
}

export default RegisterPage;
