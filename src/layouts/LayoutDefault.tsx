import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './parts/Header';
import Footer from './parts/Footer';
import Topbar from './parts/Topbar';
import { AppState } from '../stores';

function LayoutDefault() {
  const { user } = useSelector((state: AppState) => state.auth);
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
    <div className='overflow-x-hidden'>
      <Header />
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayoutDefault;
