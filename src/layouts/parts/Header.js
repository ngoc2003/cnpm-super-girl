import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerData from "../../data/headerData";
import Images from "../../images/Images";

const Header = () => {
  // const [active, setActive] =
  const { pathname } = useLocation();
  return (
    <div className=" container ">
      <div className="px-1 inline-block float-right text-xs bg-lightGray text-darkGray ">
        Staff
      </div>
      <div className="clear-both flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img className="h-[4rem]" src={Images.logo} alt="" />
          </Link>
          <div className=" px-1 flex items-start justify-center flex-col">
            <h4 className="font-semibold text-primary">TRƯỜNG ĐẠI HỌC THUỶ LỢI</h4>
            <h4 className="text-sm">THUY LOI UNIVERSITY</h4>
          </div>
        </div>
        <div className="flex-1  max-w-[600px] flex justify-between">
          {headerData.map((item) => {
            let active = pathname === item.url;
            return (
              <Link
                to={item.url}
                className={`min-w-[80px] text-center font-semibold hover:text-primary text-primary px-2 py-1 rounded-md cursor-pointer ${
                  active ? "bg-lightGray" : "hover:bg-lightGray"
                } `}
                key={item.title}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
