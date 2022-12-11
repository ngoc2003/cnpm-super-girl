import React, { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import IconIn from "../icons/IconIn";
import Images from "../images/Images";
import Header from "./parts/Header";
import { useSelector } from "react-redux";

const LayoutDefault = () => {
  return (
    <>
      <div className="flex md:h-screen">
        <div className="flex items-center px-2 bg-white">
          <span className="flex items-center justify-center w-10 h-10 duration-100 rounded-full cursor-pointer hover:bg-lightGray">
            <IconIn></IconIn>
          </span>
        </div>
        <div className="flex-1">
          <Header></Header>
          <div
            style={{
              background: `url(${Images.bgHome}) top center/ cover no-repeat`,
            }}
            className="flex-1 py-5"
          >
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutDefault;
