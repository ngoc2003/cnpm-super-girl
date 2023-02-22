import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import headerData from '../../data/headerData';
import Images from '../../images/Images';
import Cart from '../../components/cart/Cart';
import { useTranslation } from 'react-i18next';

function Header() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className='py-4 px-10 '>
      {user?.role === 1 && (
        <div className='text-right  '>
          <span className='p-1 text-xs bg-lightGray text-darkGray'>Staff</span>
        </div>
      )}
      <div className='flex items-center gap-10 justify-between w-full'>
        <div className='flex items-center'>
          <Link to='/'>
            <img className='h-[4rem]' src={Images.logo} alt='' />
          </Link>
          <div className='flex flex-col items-start justify-center px-1 '>
            <h4 className='font-semibold text-primary'>{t('schoolName')}</h4>
            <h4 className='text-sm'>{t('schoolName_english')}</h4>
          </div>
        </div>
        <div className='flex-1 flex items-center gap-10 justify-end '>
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
          {user && user?.role !== 1 ? (
            <span className='text-xl text-primary'>
              <Cart />
            </span>
          ) : user?.role == 1 ? (
            ''
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
