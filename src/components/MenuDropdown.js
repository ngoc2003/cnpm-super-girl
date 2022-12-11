import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
const MenuDropdown = ({
  fluid = false,
  data = [{ key: "1", label: "1" }],
  item = "",
  name = "Select",
  width = "250px",
  defaultValue,
  setItem = () => {},
}) => {
  const handleMenuClick = (e) => {
    setItem(e.key);
  };
  const menu = {
    items: data,
    onClick: handleMenuClick,
  };
  return (
    <Dropdown
      menu={{
        ...menu,
        selectable: true,
        defaultSelectedKeys: [`${defaultValue}`],
      }}
      className={`rounded-md  ${fluid ? "w-full" : `w-[${width}]`} `}
      trigger={["click"]}
    >
      <Button fluid>
        <span className="capitalize">{item || name}</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default MenuDropdown;
