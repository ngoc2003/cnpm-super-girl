import React from "react";
import {
  ShoppingCartOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const sidebarAdminData = [
  {
    key: "Dashboard",
    icon: React.createElement(AppstoreOutlined),
    label: "Dashboard",
  },
  {
    key: "Order",
    icon: React.createElement(ShoppingCartOutlined),
    label: "Order",
  },
  {
    key: "Setting",
    icon: React.createElement(SettingOutlined),
    label: "Setting",
  },
  {
    key: "Support",
    icon: React.createElement(QuestionCircleOutlined),
    label: "Support",
  },
];

export default sidebarAdminData;
