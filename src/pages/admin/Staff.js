import React from "react";
import { Layout } from "antd";
import optionsAdminData from "../../data/optionsAdminData";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox";

const Staff = () => {
  return (
    <Layout className=" bg-lightGray">
      <div className=" w-full p-5  rounded-xl">
        {/* <h4 className="text-xl font-semibold">Search tools</h4>
        <MenuDropdown  name="Everything"></MenuDropdown>
        <MenuDropdown  name="All items"></MenuDropdown>
        <Search placeholder="Books, documents, people and more . . ."></Search> */}
      <SearchBox className='bg-white'></SearchBox>
      </div>
      <div className="bg-white p-3 mx-5 rounded-xl ">
        <h4 className="text-xl font-semibold">Management Tools</h4>
        <div className="grid grid-cols-3 gap-5 my-5">
          {optionsAdminData.map((item) => (
            <Link
              to={item.url}
              key={item.label}
              className="flex items-center gap-5"
            >
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
