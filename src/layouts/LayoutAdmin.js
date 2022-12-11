import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./parts/Header";
import { Layout } from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const { Footer, Sider, Content, Menu } = Layout

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
const LayoutAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // useLayoutEffect(() => {
  //     if (!user) {
  //       navigate("/sign-in");
  //     };
  // }, []);
  return (
    <>
      <Header></Header>
      <hr />
      <Layout >
        <Sider>
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          /> </Sider>
        <Layout></Layout>
        Admin
        <Outlet></Outlet>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
