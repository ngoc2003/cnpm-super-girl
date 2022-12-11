import React from "react";
import { Layout, Menu } from "antd";
import MenuDropdown from "../../components/MenuDropdown";
import Search from "../../components/Search";

const Staff = () => {
  return (
    <Layout className=" bg-lightGray">
      <div className="flex items-center w-full gap-5 p-3 m-5 bg-white rounded-xl">
        <h4 className="text-xl font-semibold">Search tools</h4>
        <MenuDropdown name="Everything"></MenuDropdown>
        <MenuDropdown name="All items"></MenuDropdown>
        <Search placeholder="Books, documents, people and more . . ."></Search>
      </div>
      <Layout></Layout>
    </Layout>
  );
};

export default Staff;
