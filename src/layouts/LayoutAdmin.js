import React, { useLayoutEffect, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import Header from "./parts/Header";
import { Button, Layout, Menu } from "antd";
import Images from "../images/Images";
import sidebarAdminData from "../data/sidebarAdminData";
const { Sider } = Layout;

const LayoutAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <Header></Header>
      <hr />
      <Layout className="bg-white md:min-h-screen overflow-hidden ">
        <Sider>
          <Layout className="py-5 bg-white text-center">
            <img
              className="w-1/2 min-w-[100px] mx-auto"
              src={user?.image || Images.avatar}
              alt=""
            />
            <h4 className="font-semibold my-1">{user?.name || "Anonymous"}</h4>
            <p className="text-xs">Management</p>
            <div>
              <Button className="my-3 text-darkGray">Logout</Button>
            </div>
          </Layout>
          <Menu
            mode="inline"
            defaultSelectedKeys={["Dashboard"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              backgroundColor: "white",
              borderRight: 0,
              textAlign: "center",
            }}
            // onClick={handleClick}
            // selectedKeys={[current]}
          >
            {sidebarAdminData.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={item.url}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <div className="overfolw-scroll"></div>
        <Outlet></Outlet>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
