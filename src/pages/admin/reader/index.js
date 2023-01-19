import React from 'react';
import TableUser from '../../../components/TableUser';
import Button from '../../../components/Button';
import { useGetReadersQuery } from '../../../stores/services/reader';
import { Spin } from 'antd';

function Reader() {
  const { data, isFetching } = useGetReadersQuery();

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className='bg-lightGray w-full'>
      <div className='bg-white p-3 m-5 h-full'>
        <div className='mb-3 flex gap-3 justify-between'>
          <Button to={-1}>Back</Button>
          <div className='flex gap-3'>
            <Button className='bg-black text-white'>Black List</Button>
            <Button primary>Exel Export</Button>
          </div>
        </div>
        {data.length && <TableUser type='reader' data={data} />}
      </div>
    </div>
  );
}

export default Reader;
