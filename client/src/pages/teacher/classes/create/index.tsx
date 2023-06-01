import React from "react";
import { parseCookies } from "nookies";
import { message } from "antd";
import { AxiosError } from "axios";
import Dashboard from "../../../../components/Dashboard";
import TeacherDashboard from "../../../../components/Dashboard/secondLayout";
import TeacherCreateClassContent from "../../../../components/Dashboard/Teacher/classes/CreateForm";
import TeacherPages from "../../../../config/teacherPages";

import siderItensTeacherClasses from "../../../../config/classesTeacherSubMenu";

import api from "../../../../services/request.service";

const onCreateClass = (values: any) => {
  api
    .post(`/classes`, {
      ...values,
    })
    .then(() => {
      message.success(`Operação realizada com sucesso!`);
    })
    .catch((error: AxiosError<any>) => {
      const errors = error.response.data?.data;
      Object.keys(error.response.data?.data).forEach((e) => {
        message.error(`${JSON.stringify(errors[e])}`);
      });
    });
};

function TeacherClassesPage() {
  return (
    <Dashboard pages={TeacherPages} selectedKey="tab-4">
      <TeacherDashboard
        siderItens={siderItensTeacherClasses}
        selectOpenKey="subKey-2"
        selectedKey="subKey-2"
      >
        <TeacherCreateClassContent onCreateClass={onCreateClass} />
      </TeacherDashboard>
    </Dashboard>
  );
}

export default TeacherClassesPage;

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

  return {
    props: {},
  };
}
