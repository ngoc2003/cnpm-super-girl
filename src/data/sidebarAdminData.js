import React from 'react';
import { QuestionCircleOutlined, AppstoreOutlined } from '@ant-design/icons';

const sidebarAdminData = [
  {
    key: 'Dashboard',
    icon: React.createElement(AppstoreOutlined),
    label: 'Dashboard',
    url: '/staff/account',
  },
  {
    key: 'Support',
    icon: React.createElement(QuestionCircleOutlined),
    label: 'Support',
    url: 'https://www.facebook.com/messages/t/5129375647163970',
  },
];

export default sidebarAdminData;
