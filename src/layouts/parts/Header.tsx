import { Link, useLocation } from 'react-router-dom';
import headerData from '../../data/headerData';
import Images from '../../images/Images';
import Cart from '../../components/cart/Cart';
import { useTranslation } from 'react-i18next';
import { AppState } from '../../stores';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useMediaQuery from '../../hooks/useMediaQuery';

function Header() {
  const { user } = useSelector((state: AppState) => state.auth);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isTablet = useMediaQuery('(max-width: 900px)');

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenSideBar = () => {
    setOpen(true);
  };

  const handleCloseSideBar = () => {
    setOpen(false);
  };

  return (
    <div className='py-4 px-6 sm:px-10 bg-white'>
      <div className='flex items-center sm:gap-10 justify-between w-full '>
        <div className='flex items-center'>
          <Link to='/'>
            <img className='h-[3rem] sm:h-[4rem]' src={Images.logo} alt='' />
          </Link>
          <div className='flex flex-col items-start justify-center px-1 '>
            <h4 className='text-sm sm:text-md font-semibold text-primary'>
              {t('schoolName')}
            </h4>
            <h4 className='text-xs sm:text-sm'>{t('schoolName_english')}</h4>
          </div>
        </div>
        {isTablet && (
          <span>
            <Button type='text' onClick={handleOpenSideBar}>
              <MenuOutlined size={20} />
            </Button>
          </span>
        )}
        {open && isTablet && (
          <div
            className='fixed inset-0 z-[45] bg-black bg-opacity-50 lg:hidden'
            onClick={handleCloseSideBar}
          ></div>
        )}
        <div
          className={`justify-center duration-300 flex-1 flex lg:flex-row flex-col w-[250px] lg:w-auto items-center gap-10 lg:justify-end fixed lg:static bg-white top-0  z-50 -ml-10 lg:ml-0 py-10 lg:py-0 lg:translate-x-0  ${
            open ? 'translate-x-0' : '-translate-x-[500px]'
          } ${isTablet && 'h-screen'}`}
        >
          {headerData.map((item) => {
            const active = pathname === item.url;
            return (
              <Link
                to={item.url}
                className={`min-w-[80px] text-center font-semibold hover:text-primary text-primary px-2 py-1 rounded-md cursor-pointer ${
                  active ? 'bg-lightGray' : 'hover:bg-lightGray'
                } `}
                key={item.title}
              >
                {item.title}
              </Link>
            );
          })}
          {user && user?.role === 0 ? (
            <>
              <Link
                to='/me'
                className={`min-w-[80px] text-center font-semibold hover:text-primary text-primary px-2 py-1 rounded-md cursor-pointer ${
                  pathname === '/me' ? 'bg-lightGray' : 'hover:bg-lightGray'
                } `}
              >
                My Profile
              </Link>

              <span className='text-xl text-primary'>
                <Cart />
              </span>
            </>
          ) : (
            <Link
              to='/sign-in'
              className='bg-primary text-white py-2 px-4 rounded-[20px] hover:text-white hover:bg-opacity-50 duration-150'
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
