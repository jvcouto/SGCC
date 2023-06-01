import React from "react";
import { parseCookies } from "nookies";

import Dashboard from "../../components/Dashboard";
import TeacherDashboard from "../../components/Dashboard/secondLayout";
import TeacherMainContent from "../../components/Dashboard/Teacher/Main";
import TeacherPages from "../../config/teacherPages";
import siderItensTeacherMain from "../../config/mainTeacherSubMenu";

import api from "../../services/request.service";

function TeacherPage() {
  return (
    <Dashboard pages={TeacherPages} selectedKey="tab-1">
      <TeacherDashboard
        siderItens={siderItensTeacherMain}
        selectedKey="subKey-1"
        selectOpenKey="subKey-1"
      >
        <TeacherMainContent />
      </TeacherDashboard>
    </Dashboard>
  );
}

export default TeacherPage;

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

  return { props: {} };
}
