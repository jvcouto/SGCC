import React from "react";
import { parseCookies } from "nookies";
import Dashboard from "../../../components/Dashboard";
import TeacherDashboard from "../../../components/Dashboard/secondLayout";
import TeacherListClassesContent from "../../../components/Dashboard/Teacher/classes";
import TeacherPages from "../../../config/teacherPages";

import siderItensTeacherClasses from "../../../config/classesTeacherSubMenu";

import api from "../../../services/api";
import { TeacherClassesPageProps } from "../../../ultis/ApiResposeTypes/Classes";

function TeacherClassesPage(props: TeacherClassesPageProps) {
  const { classes } = props;
  return (
    <Dashboard pages={TeacherPages} selectedKey="tab-4">
      <TeacherDashboard
        siderItens={siderItensTeacherClasses}
        selectOpenKey="subKey-1"
        selectedKey="subKey-1"
      >
        <TeacherListClassesContent classes={classes} />
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
