import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../../components/Search';
import IconUser from '../../icons/IconUser';
import Images from '../../images/Images';
import { AppState } from '../../stores';
import { motion, useAnimation } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import Button from '../../components/Button';
import { t } from 'i18next';
function Hero() {
  const { user } = useSelector((state: AppState) => state.auth);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const isExtraLarge = useMediaQuery('(min-width:1000px');
  const titleControl = useAnimation();
  const searchBarControl = useAnimation();

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

  async function showThenHide() {
    if (!isExtraLarge) {
      await titleControl.start({
        top: '55%',
        opacity: 0,
      });
      await titleControl.start({
        top: '50%',
        opacity: 1,
        transition: {
          duration: 1,
          ease: 'linear',
        },
      });
      await titleControl.start({
        opacity: 0,
        transition: {
          delay: 1,
          duration: 1,
          ease: 'linear',
        },
      });
      await titleControl.start({
        display: 'none',
      });
    } else {
      await titleControl.start({
        opacity: 1,
      });
    }
  }

  async function slideToTopSearchBar() {
    if (!isExtraLarge) {
      await searchBarControl.start({
        opacity: 0,
      });
      await searchBarControl.start({
        translateY: 20,
        opacity: 0,
        transition: {
          delay: 3.5,
        },
      });
      await searchBarControl.start({
        translateY: 0,
        opacity: 1,
        transition: {
          duration: 1,
          ease: 'linear',
        },
      });
    } else {
      await searchBarControl.start({
        opacity: 1,
      });
    }
  }

  useEffect(() => {
    showThenHide();
    slideToTopSearchBar();
  }, [isExtraLarge]);

  return (
    <div
      style={{
        background: `url(${Images.bgHome}) top center/ cover no-repeat`,
      }}
      className='flex-1 py-5 px-10 h-[400px] xl:h-auto relative'
    >
      <motion.div
        className='opacity-0 xl:opacity-1 text-center sm:text-left'
        animate={searchBarControl}
      >
        <div className='flex items-center justify-between'>
          <Search
            max
            onKeyUp={handleSearch}
            onClick={handleSearch}
            placeholder='Find book, author, . . .'
          />
          {user && user.role === 0 ? (
            <Link
              className='lg:flex gap-3 font-semibold text-white hover:text-secondary hidden'
              to='/me'
            >
              <>{t('button.myProfile')}</>
              <IconUser />
            </Link>
          ) : (
            ''
          )}
        </div>
        <div>
          <h4 className='py-5 text-white text-2xl md:text-4xl xxl:text-5xl font-bold max-w-[400px]'>
            QUICK START GUIDE TO USE LIBRARY
          </h4>
        </div>
        <div className='w-20 border-b-2 border-b-secondary mx-auto sm:mx-0' />
        <Button className='rounded-[90px] mt-5 border-2 text-white bg-transparent text-sm'>
          FIND OUT HOW
        </Button>
      </motion.div>
      <motion.div
        className='absolute xl:static left-1/2 z-40 -translate-y-1/2 -translate-x-1/2 xl:translate-x-0 xl:translate-y-0 opacity-0'
        animate={titleControl}
      >
        <div className='xxl:text-[85px] md:text-[60px] text-[40px] text-center text-white font-brittany'>
          Welcome to TLU
        </div>
        <div className='xxl:text-[100px] md:text-[80px] text-[60px] tracking-wide text-center text-white'>
          LIBRARY
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
