import React from "react";
import { Outlet } from "react-router-dom";
import Images from "../images/Images";
import Header from "./parts/Header";

const LayoutDefault = () => {
  return (
    <div>
      <Header></Header>
      <div
        style={{ background: `url(${Images.bgHome}) top center/ cover no-repeat` }}
        className="min-h-screen"
      >
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default LayoutDefault;
