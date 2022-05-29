import React from "react";
import { parseCookies } from "nookies";

import { LaptopOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import Router from "next/router";
import Dashboard from "../../../components/Dashboard";
import TeacherDashboard from "../../../components/Dashboard/secondLayout";
import TeacherClassesContent from "../../../components/Dashboard/Teacher/classes";
import TeacherPages from "../../../config/teacherPages";

import api from "../../../services/api";

const sidersOptions = [
  {
    label: "N sei ainda",
    path: "classes",
    icon: LaptopOutlined,
  },
];

const siderItens: MenuProps["items"] = sidersOptions.map((e) => ({
  key: e.path,
  label: e.label,
  icon: React.createElement(e.icon),
  onClick: () => Router.push(`/teacher/questionnaires`),
}));

function TeacherClassesPage() {
  return (
    <Dashboard pages={TeacherPages} selectedKey="tab-3">
      <TeacherDashboard siderItens={siderItens}>
        <h1>Pagina de questionarios - proximas entregas</h1>
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

  return { props: {} };
}
