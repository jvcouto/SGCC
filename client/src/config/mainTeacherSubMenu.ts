import React from "react";
import {
  LaptopOutlined,
  SettingOutlined,
  MailOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Router from "next/router";

const sidersOptions = [
  {
    label: "Overview",
    path: "/teacher", // fazer ainda
    icon: LaptopOutlined,
    key: "subKey-1",
  },
  {
    label: "Minha Conta",
    icon: SettingOutlined,
    key: "subKey-2",
    subOptions: [
      {
        label: "Alterar email",
        path: "/teacher/config/email",
        icon: MailOutlined,
        key: "subKeyOption-1",
      },
      {
        label: "Alterar senha",
        path: "/teacher/config/password",
        icon: KeyOutlined,
        key: "subKeyOption-2",
      },
    ],
  },
];

const siderItensTeacherMain: MenuProps["items"] = sidersOptions.map((e) => ({
  key: e.key,
  label: e.label,
  icon: React.createElement(e.icon),
  onClick: e.path && (() => Router.push(e.path)),
  children:
    e.subOptions &&
    e.subOptions.map((eSub) => ({
      key: eSub.key,
      label: eSub.label,
      icon: React.createElement(eSub.icon),
      onClick: () => Router.push(eSub.path),
    })),
}));

export default siderItensTeacherMain;
