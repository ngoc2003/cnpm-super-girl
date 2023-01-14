import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Search from '../../components/Search';
import IconUser from '../../icons/IconUser';
import Images from '../../images/Images';

function Hero() {
  const { user } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate('Library', {
        state: {
          value: searchValue,
        },
      });
    } else {
      setSearchValue(e.target.value);
    }
  };

  useEffect(() => {
    const animate = async () => {
      if (containerRef.current) {
        const ScrollReveal = (await import('scrollreveal')).default;
        ScrollReveal().reveal('.reveal-item', {
          delay: 750,
          interval: 50,
          distance: '64px',
        });
      }
    };
    animate();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: `url(${Images.bgHome}) top center/ cover no-repeat`,
      }}
      className='flex-1 py-5 px-10'
    >
      <div className='flex items-center justify-between'>
        <Search
          className='reveal-item'
          onKeyUp={handleSearch}
          onClick={handleSearch}
          placeholder='Find book, author, . . .'
        />
        {!user ? (
          <Link
            className='flex gap-3 font-semibold text-white hover:text-secondary '
            to='/sign-in'
          >
            My Account
            <IconUser />
          </Link>
        ) : user.role === 1 ? (
          <Link
            className='flex gap-3 font-semibold text-white hover:text-secondary '
            to='/staff/account'
          >
            My Account
            <IconUser />
          </Link>
        ) : (
          <Link
            className='flex gap-3 font-semibold text-white hover:text-secondary '
            to='/'
          >
            My Account
            <IconUser />
          </Link>
        )}
      </div>
      <div>
        <h4 className='reveal-item py-5 text-white text-5xl font-bold max-w-[400px]'>
          QUICK START GUIDE TO USE LIBRARY
        </h4>
      </div>
      <div className='reveal-item w-20 border-b-2 border-b-secondary' />
      <Button className='reveal-item rounded-[90px] mt-5 border-2 text-white bg-transparent'>
        FIND OUT HOW
      </Button>
      <div className='reveal-item'>
        <div className='text-[85px] text-center text-white font-brittany'>
          Welcome to TLU
        </div>
        <div className='text-[100px] tracking-wide text-center text-white'>
          LIBRARY
        </div>
      </div>
    </div>
  );
}

export default Hero;
