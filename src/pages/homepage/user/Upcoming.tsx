import Images from '../../../images/Images';
import upcomingData from '../../../data/upcomingData';

function Upcoming() {
  return (
    <div className='lg:grid grid-cols-3 gap-5 lg:pr-10'>
      <img
        src={Images.upcomingEvents}
        className='col-span-2 w-full mb-5'
        alt=''
      />
      <div>
        <h4 className='text-center text-primary text-3xl font-semibold mb-8'>
          Upcoming Events
        </h4>
        <div className='flex flex-col'>
          {upcomingData.map((item) => (
            <div key={item.title} className='grid grid-cols-3 gap-2'>
              <p className='border-r-2 border-r-black text-right pr-5 lg:pr-0 lg:text-left'>
                {item.time}
              </p>
              <p className='col-span-2 pb-10 font-semibold'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
