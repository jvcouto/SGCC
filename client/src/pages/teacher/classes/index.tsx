import React from "react";
import { parseCookies } from "nookies";
import { message } from "antd";
import { AxiosError } from "axios";
import Dashboard from "../../../components/Dashboard";
import TeacherDashboard from "../../../components/Dashboard/secondLayout";
import TeacherListClassesContent from "../../../components/Dashboard/Teacher/classes";
import TeacherPages from "../../../config/teacherPages";

import siderItensTeacherClasses from "../../../config/classesTeacherSubMenu";

import api from "../../../services/request.service";
import { ClassProps } from "../../../ultis/ApiResposeTypes/Classes";

interface TeacherClassPageProps {
  classes: ClassProps[];
}

const onConfirmDelete = (values: any) => {
  api
    .patch(`/classes/${values.id}`, {
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

function TeacherClassesPage(props: TeacherClassPageProps) {
  const { classes } = props;
  return (
    <Dashboard pages={TeacherPages} selectedKey="tab-4">
      <TeacherDashboard
        siderItens={siderItensTeacherClasses}
        selectOpenKey="subKey-1"
        selectedKey="subKey-1"
      >
        <TeacherListClassesContent
          classes={classes}
          onConfirmDelete={onConfirmDelete}
        />
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

  try {
    const res = await api.get("/classes");
    const classes = res.data.data;
    return {
      props: {
        classes,
      },
    };
  } catch (e) {
    // later
  }
}
