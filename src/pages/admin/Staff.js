import React from "react";
import { Layout, Menu } from "antd";
import MenuDropdown from "../../components/MenuDropdown";
import Search from "../../components/Search";
import optionsAdminData from "../../data/optionsAdminData";
import { Link } from "react-router-dom";

const Staff = () => {
  return (
    <Layout className=" bg-lightGray">
      <div className="flex items-center w-full gap-5 p-3 m-5 bg-white rounded-xl">
        <h4 className="text-xl font-semibold">Search tools</h4>
        <MenuDropdown name="Everything"></MenuDropdown>
        <MenuDropdown name="All items"></MenuDropdown>
        <Search placeholder="Books, documents, people and more . . ."></Search>
      </div>
      <div className="bg-white p-3 mx-5 rounded-xl ">
        <h4 className="text-xl font-semibold">Management Tools</h4>
        <div className="grid grid-cols-3 gap-5 my-5">
          {optionsAdminData.map((item) => (
            <Link to={item.url} key={item.label} className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full overflow-hidden object-cover">
                <img src={item.image} className="h-full" alt="" />
              </div>
              <h4 className="text-black">{item.label}</h4>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
