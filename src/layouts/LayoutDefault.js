import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './parts/Header';
import Footer from './parts/Footer';
import Topbar from './parts/Topbar';

function LayoutDefault() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 1) {
      navigate('/staff');
    }
    if (window.location.href.includes('staff') && !user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className='flex md:h-screen'>
      <div className='flex-1'>
        <Header />
        <Topbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default LayoutDefault;
