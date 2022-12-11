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
    url: "/staff/account",
  },
  // {
  //   key: "Order",
  //   icon: React.createElement(ShoppingCartOutlined),
  //   label: "Order",
  //   url: "/staff/account/Order",
  // },
  // {
  //   key: "Setting",
  //   icon: React.createElement(SettingOutlined),
  //   label: "Setting",
  //   url: "/staff/account/Setting",
  // },
  {
    key: "Support",
    icon: React.createElement(QuestionCircleOutlined),
    label: "Support",
    url: "https://www.facebook.com/messages/t/5129375647163970",
  },
];

export default sidebarAdminData;
