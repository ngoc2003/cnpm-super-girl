import {
  EnvironmentOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
import { t } from 'i18next';
import Images from '../../images/Images';

const Footer = () => {
  const copyRightContent = `Copyright ${new Date().getFullYear()} © All Rights Reserve`;
  return (
    <>
      <div className='pt-10'></div>
      <Layout className='md:grid grid-cols-3 bg-white'>
        <Layout className='md:col-span-1'>
          <img src={Images.footer} className='h-full object-cover' alt='' />
        </Layout>
        <div className='col-span-2 bg-primary p-5 flex'>
          <div className='flex-1'>
            <h4 className='text-white text-2xl  xl:text-3xl font-bold mb-2 '>
              <>{t('logoName')}</>
            </h4>
            <ul className='list-none text-white flex flex-col gap-3 text-sm xl:text-md'>
              <li className='flex gap-3 items-center'>
                <>
                  <MailOutlined style={{ fontSize: '20px' }} />
                </>
                <>{t('contact.email')}</>
              </li>
              <li className='flex gap-3 items-center'>
                <>
                  <GlobalOutlined style={{ fontSize: '20px' }} />
                </>
                <>{t('contact.website')}</>
              </li>
              <li className='flex gap-3 items-center'>
                <>
                  <PhoneOutlined style={{ fontSize: '20px' }} />
                </>
                <>{t('contact.phoneNumber')}</>
              </li>
              <li className='flex gap-3 items-center'>
                <>
                  {' '}
                  <EnvironmentOutlined style={{ fontSize: '20px' }} />
                </>
                <>{t('contact.address')}</>
              </li>
            </ul>
          </div>
          <div className='flex flex-col flex-1'>
            <h4 className='text-white text-2xl  xl:text-3xl font-bold mb-2 '>
              <>{t('title.membersOfTeam')}</>
            </h4>
            <ul className='list-none text-white flex flex-col gap-3 text-sm xl:text-md'>
              <li className='flex gap-3 items-center'>
                Bui Thuy Ngoc{' '}
                <span className='opacity-70 text-xs'>
                  <>- {t('role.coder')}</>
                </span>
              </li>
              <li className='flex gap-3 items-center'>
                Do Quyen{' '}
                <span className='opacity-70 text-xs'>
                  <> - {t('role.designer')}</>
                </span>
              </li>
            </ul>
            <span className='text-white opacity-70 flex-1 flex items-end text-sm xl:text-md'>
              {copyRightContent}
            </span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Footer;
