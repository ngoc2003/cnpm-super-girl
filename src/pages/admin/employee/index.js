import React from 'react';
import TableEmployee from '../../../components/TableUser';
import Button from '../../../components/Button';
import { useGetAdminsQuery } from '../../../stores/services/admin';
import { Spin } from 'antd';

function Employee() {
  const { data, isFetching } = useGetAdminsQuery();

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className='bg-lightGray w-full'>
      <div className='bg-white p-3 m-5 h-full'>
        <div className='mb-3 flex gap-3 justify-between'>
          <Button to={-1}>Back</Button>
          <div className='flex gap-3'>
            <Button to='/staff/account/Employee/add' primary>
              Add new Employee
            </Button>
          </div>
        </div>
        <TableEmployee data={data} />
      </div>
    </div>
  );
}

export default Employee;
