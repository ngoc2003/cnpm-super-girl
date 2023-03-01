import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import headerData from '../../data/headerData';
import Images from '../../images/Images';
import Cart from '../../components/cart/Cart';
import { useTranslation } from 'react-i18next';
import { AppState } from '../../stores';
import Header from './Header';

function Topbar() {
  const { pathname } = useLocation();
  const { user } = useSelector((state: AppState) => state.auth);
  const { t } = useTranslation();

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleShowWhenScroll = () => {
      window.addEventListener('scroll', () => {
        window.pageYOffset >= 150 ? setScroll(true) : setScroll(false);
      });
    };
    handleShowWhenScroll();

    return () => window.removeEventListener('scroll', handleShowWhenScroll);
  }, []);

  return (
    <div
      className={`fixed z-40 duration-300 ${
        scroll ? 'top-0' : '-top-full'
      } left-0 right-0  `}
    >
      <Header></Header>
    </div>
  );
}

export default Topbar;
