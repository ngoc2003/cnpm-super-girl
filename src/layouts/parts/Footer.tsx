import {
  EnvironmentOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
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
        <div className='col-span-2 bg-primary p-5 py-8 flex sm:flex-row flex-col gap-5 gap-y-8'>
          <div className='flex-1'>
            <h4 className='text-white text-3xl font-bold mb-2 '>
              <>{t('logoName')}</>
            </h4>
            <ul className='list-none text-white flex flex-col gap-3 text-md'>
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
              <a
                target='_blank'
                href='https://www.google.com/maps/dir//175+P.+T%C3%A2y+S%C6%A1n,+Trung+Li%E1%BB%87t,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3135ad744eb9a567:0x86ebcd89ee0bda7b?sa=X&ved=2ahUKEwiSla7ZkKn-AhURUfUHHZO1DrUQwwV6BAgJEAM'
                className='flex gap-3 items-center'
                rel='noreferrer'
              >
                <>
                  {' '}
                  <EnvironmentOutlined style={{ fontSize: '20px' }} />
                </>
                <>{t('contact.address')}</>
              </a>
            </ul>
          </div>
          <div className='flex flex-col flex-1'>
            <h4 className='text-white text-3xl font-bold mb-2 '>
              <>{t('title.membersOfTeam')}</>
            </h4>
            <ul className='list-none text-white flex flex-col gap-3 text-md'>
              <a
                target='_blank'
                href='https://www.facebook.com/Bui.Ngoc.1302/'
                className='flex gap-3 items-center'
                rel='noreferrer'
              >
                Bui Thuy Ngoc{' '}
                <span className='opacity-70 text-xs'>
                  <>- {t('role.coder')}</>
                </span>
              </a>
              <a
                target='_blank'
                href='https://www.facebook.com/profile.php?id=100012511084005'
                className='flex gap-3 items-center'
                rel='noreferrer'
              >
                Do Quyen{' '}
                <span className='opacity-70 text-xs'>
                  <> - {t('role.designer')}</>
                </span>
              </a>
            </ul>
            <span className='text-white opacity-70 flex-1 flex items-end text-md'>
              {copyRightContent}
            </span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Footer;
