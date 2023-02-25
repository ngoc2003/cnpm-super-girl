import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import optionsAdminData from '../../data/optionsAdminData';

function Staff() {
  return (
    <Layout className=' bg-lightGray '>
      <div className='bg-white p-3 m-5 rounded-xl '>
        <h4 className='text-xl font-semibold'>Management Tools</h4>
        <div className='grid grid-cols-3 gap-5 my-5'>
          {optionsAdminData.map((item) => (
            <Link
              to={item.url}
              key={item.label}
              className='flex items-center gap-5'
            >
              <div className='w-20 h-20 rounded-full overflow-hidden object-cover'>
                <img src={item.image} className='h-full' alt='' />
              </div>
              <h4 className='text-black'>{item.label}</h4>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Staff;
