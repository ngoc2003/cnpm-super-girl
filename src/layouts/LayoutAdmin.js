import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import Header from './parts/Header';
import Images from '../images/Images';
import sidebarAdminData from '../data/sidebarAdminData';
import { handleLogout } from '../stores/thunk/auth';

const { Sider } = Layout;

function LayoutAdmin() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <hr />
      <Layout className='md:min-h-screen overflow-hidden '>
        <Sider className='bg-white'>
          <Layout className='py-5 text-center'>
            <img
              className='w-1/2 min-w-[100px] mx-auto'
              src={user?.image || Images.avatar}
              alt=''
            />
            <h4 className='font-semibold my-1'>{user?.name || 'Anonymous'}</h4>
            <p className='text-xs'>Management</p>
            <div>
              <Button onClick={handleLogout} className='my-3 text-darkGray'>
                Logout
              </Button>
            </div>
          </Layout>
          <Menu
            mode='inline'
            defaultSelectedKeys={['Dashboard']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              backgroundColor: 'white',
              borderRight: 0,
            }}
          >
            {sidebarAdminData.map((item) => (
              <Menu.Item key={item.key}>
                <a
                  className='flex items-left items-center justify-left gap-5'
                  href={item.url}
                >
                  {item.icon}
                  {item.label}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <div className='overfolw-scroll' />
        <Outlet />
      </Layout>
    </>
  );
}

export default LayoutAdmin;
