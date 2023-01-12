import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconIn from '../icons/IconIn';
import IconOut from '../icons/IconOut';
import Header from './parts/Header';
import { handleLogout } from '../stores/thunk/auth';

function LayoutDefault() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 1) {
      navigate('/staff');
    }
    // eslint-disable-next-line no-undef
    if (window.location.href.includes('staff') && !user) {
      navigate('/');
    }
  }, [user]);
  return (
    <div className='flex md:h-screen'>
      <div className='flex items-center px-2 bg-white '>
        <span className='flex items-center justify-center w-10 h-10 duration-100 rounded-full cursor-pointer border mr-2  hover:bg-lightGray'>
          {!user ? (
            <IconIn onClick={() => navigate('/sign-in')} />
          ) : (
            <IconOut onClick={handleLogout} />
          )}
        </span>
      </div>
      <div className='flex-1'>
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

export default LayoutDefault;
