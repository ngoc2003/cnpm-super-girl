import specialCollectionsData from '../../../data/specialCollectionsData';

function SpecialCollections() {
  return (
    <div className='text-center p-10'>
      <h4 className='header-links text-primary font-bold text-2xl'>
        Our Special
      </h4>
      <p className='header-links text-[50px] sm:text-[80px] md:text-[140px] leading-none stroke-text mb-5'>
        Collections
      </p>
      <div className='flex gap-8 flex-col lg:flex-row '>
        {specialCollectionsData.map((item) => (
          <div
            className='header-links-item flex-1 flex flex-col items-center'
            key={item.title}
          >
            <img
              src={item.image}
              className='w-full h-[300px] object-cover rounded-xl'
              alt=''
            />
            <div className='bg-white w-[80%] flex-1 -translate-y-6 p-3 text-left box-shadow-creative rounded-xl'>
              <h4 className='font-semibold text-primary text-lg'>
                {item.title}
              </h4>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpecialCollections;
