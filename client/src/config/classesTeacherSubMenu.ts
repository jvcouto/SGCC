import React from "react";
import { TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import Router from "next/router";

const sidersOptions = [
  {
    label: "Listar Turmas",
    path: "/teacher/classes",
    icon: TeamOutlined,
    key: "subKey-1",
  },
  {
    label: "Cadastrar Turma",
    path: "/teacher/classes/create",
    icon: UsergroupAddOutlined,
    key: "subKey-2",
  },
];

const siderItensTeacherClasses: MenuProps["items"] = sidersOptions.map((e) => ({
  key: e.key,
  label: e.label,
  icon: React.createElement(e.icon),
  onClick: () => Router.push(`${e.path}`),
}));

export default siderItensTeacherClasses;
