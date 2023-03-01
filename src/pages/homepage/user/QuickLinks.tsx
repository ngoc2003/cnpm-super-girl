import { v4 } from 'uuid';
import quickLinksData from '../../../data/quickLinksData';
import Images from '../../../images/Images';

function QuickkLinks() {
  return (
    <div className='w-full relative flex flex-col items-center '>
      <img src={Images.quickLinks} className='w-full' alt='' />
      <div className='flex gap-10 absolute left-0 top-0 px-10 py-5 lg:py-8 right-0 bg-primary bg-opacity-80 '>
        <p>
          <h4 className='text-white font-bold text-xl lg:text-2xl pt-4 border-b-2 '>
            Quicklinks
          </h4>
        </p>
        <div className='flex flex-1 gap-5 justify-between text-xs lg:text-md xl:text-lg'>
          {quickLinksData.map((item) => (
            <span
              className='cursor-pointer border-l-2 duration-200 border-secondary pl-1 py-4 hover:bg-secondary text-white flex justify-center items-center text-center flex-1'
              key={v4()}
            >
              {item.title}
            </span>
          ))}
        </div>
      </div>
      <div className=' bg-secondary text-white bg-opacity-80 text-2xl px-5 py-10 -translate-y-1/2 font-semibold hover:bg-opacity-100 duration-100'>
        Discover Special Collection
      </div>
    </div>
  );
}

export default QuickkLinks;
