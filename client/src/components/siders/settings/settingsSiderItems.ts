import React from "react";
import { SettingOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import Router from "next/router";

const sidersOptions = [
  {
    label: "Minha Conta",
    icon: SettingOutlined,
    key: "subKey-2",
    subOptions: [
      {
        label: "Alterar email",
        path: "/dashboard/settings/email",
        icon: MailOutlined,
        key: "subKeyOption-1",
      },
      {
        label: "Alterar senha",
        path: "/dashboard/settings/password",
        icon: KeyOutlined,
        key: "subKeyOption-2",
      },
    ],
  },
];

const configSiderItems: MenuProps["items"] = sidersOptions.map((e) => ({
  key: e.key,
  label: e.label,
  icon: React.createElement(e.icon),
  children:
    e.subOptions &&
    e.subOptions.map((eSub) => ({
      key: eSub.key,
      label: eSub.label,
      icon: React.createElement(eSub.icon),
      onClick: () => Router.push(eSub.path),
    })),
}));

export default configSiderItems;
