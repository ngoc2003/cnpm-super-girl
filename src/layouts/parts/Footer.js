import {
  EnvironmentOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import Images from '../../images/Images';

const Footer = () => {
  const copyRightContent = `Copyright ${new Date().getFullYear()} © All Rights Reserve`;
  return (
    <>
      <div className='h-10'></div>
      <Layout className='grid grid-cols-3 bg-white'>
        <Layout className='col-span-1'>
          <img src={Images.footer} className='h-full object-cover' alt='' />
        </Layout>
        <div className='col-span-2 bg-primary p-5 flex'>
          <div className='flex-1'>
            <Title style={{ color: '#fff' }}>TLU LIBRARY</Title>
            <ul className='list-none text-white flex flex-col gap-3'>
              <li className='flex gap-3 items-center'>
                <MailOutlined style={{ fontSize: '20px' }} />
                tlulib@readbook.com
              </li>
              <li className='flex gap-3 items-center'>
                <GlobalOutlined style={{ fontSize: '20px' }} />
                www.tlulib.com
              </li>
              <li className='flex gap-3 items-center'>
                <PhoneOutlined style={{ fontSize: '20px' }} />
                123 456 7890
              </li>
              <li className='flex gap-3 items-center'>
                <EnvironmentOutlined style={{ fontSize: '20px' }} />
                175 Tay Son St, Dong Da, Ha Noi
              </li>
            </ul>
          </div>
          <div className='flex flex-col flex-1'>
            <Title style={{ color: '#fff' }}>MEMBERS OF TEAMS</Title>
            <ul className='list-none text-white flex flex-col gap-3'>
              <li className='flex gap-3 items-center'>
                Bui Thuy Ngoc{' '}
                <span className='opacity-70 text-xs'>- Coder</span>
              </li>
              <li className='flex gap-3 items-center'>
                Do Quyen <span className='opacity-70 text-xs'>- Designer</span>
              </li>
            </ul>
            <span className='text-white opacity-70 flex-1 flex items-end'>
              {copyRightContent}
            </span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Footer;
