import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { v4 } from 'uuid';
import quickLinksData from '../../../data/quickLinksData';
import Images from '../../../images/Images';
import { motion, useAnimation } from 'framer-motion';
import useMediaQuery from '../../../hooks/useMediaQuery';

function QuickkLinks() {
  const ulRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 550px');
  const toggle = () => {
    setActive(!active);
  };

  const animateControl = useAnimation();

  async function showThenHide() {
    await animateControl.start({
      translateY: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
      },
    });
  }

  useEffect(() => {
    if (active) {
      showThenHide();
    }
  }, [active]);

  return (
    <div className='w-full relative flex flex-col'>
      <img src={Images.quickLinks} className='w-full' alt='' />
      <div className=' flex flex-col md:flex-row gap-5 md:gap-10 absolute left-0 top-0 px-5 md:px-10 md:py-5 py-3 lg:py-8 right-0 bg-primary bg-opacity-80 items-center justify-center '>
        <h4
          className='text-white font-bold text-xl lg:text-2xl  md:border-b-2 text-center '
          onClick={toggle}
        >
          Quicklinks
        </h4>
        <div
          ref={ulRef}
          className={`max-h-[80px] sm:max-h-[400px] sm:overflow-y-auto overflow-y-scroll sm:flex flex-1 gap-5 justify-between text-[8px] sm:text-xs lg:text-md xl:text-lg  ${
            active ? 'block' : 'hidden'
          }`}
        >
          {quickLinksData.map((item) => {
            return (
              <motion.span
                animate={animateControl}
                initial={{ translateY: isMobile ? -20 : 0 }}
                className={`cursor-pointer sm:border-l-2 sm:duration-200 border-secondary pl-1 py-2 md:py-3 hover:bg-secondary text-white  flex justify-center items-center text-center flex-1`}
                key={v4()}
              >
                {item.title}
              </motion.span>
            );
          })}
        </div>
      </div>
      <div className='hidden xs:block text-center mb-10'>
        <span className='bg-secondary text-white bg-opacity-80 text-md sm:text-lg md:text-2xl px-5 py-5 md:py-10 -translate-y-1/2  font-semibold hover:bg-opacity-100 duration-100'>
          Discover Special Collection
        </span>
      </div>
    </div>
  );
}

export default QuickkLinks;
