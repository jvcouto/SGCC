import React from "react";
import { Menu } from "antd";
import configSiderItems from "./settingsSiderItems";

function SettingsSiderItens() {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["subKeyOption-1"]}
      defaultOpenKeys={["subKey-2"]}
      style={{ height: "100.1%", borderRight: 0, padding: "5px" }}
      items={configSiderItems}
    />
  );
}

export default SettingsSiderItens;
