import React from "react";
import Images from "../images/Images";
import { Outlet } from "react-router-dom";

const LayoutAuthen = () => {
  return (
    <div
      style={{
        background: `url(${Images.bgAuthen}) top center/ cover no-repeat`,
      }}
      className="text-black flex jusify-center items-center min-h-screen lg:py-8"
    >
      <Outlet></Outlet>
    </div>
  );
};

export default LayoutAuthen;
