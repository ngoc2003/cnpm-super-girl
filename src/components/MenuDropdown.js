import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
const MenuDropdown = ({
  fluid = false,
  data = [{ key: "1", label: "1" }],
  item = "",
  name = "Select",
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
      className={`rounded-md  ${fluid ? "w-full" : "w-[250px]"} `}
      trigger={["click"]}
    >
      <Button fluid>
        {item || <span className="">{name}</span>}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default MenuDropdown;
