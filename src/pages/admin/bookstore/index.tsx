import { useState } from 'react';
import TableList from '../../../components/TableList';
import Button from '../../../components/Button';
import { t } from 'i18next';
import { useGetBooksQuery } from '../../../stores/services/book';
import { BookType } from '../../../stores/services/typing';
import { Spin } from 'antd';

function Bookstore() {
  const { data, isFetching } = useGetBooksQuery();

  if (isFetching) {
    return (
      <div className='flex items-center justify-center w-full h-[80vh]'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='bg-lightGray w-full'>
      <div className='bg-white p-3 m-5 h-full'>
        <div className='mb-3 flex gap-3 justify-between'>
          <Button to='/staff/account'>
            <>{t('button.back')}</>
          </Button>
          <div className='flex gap-3'>
            <Button to='/staff/account/Bookstore/add' primary>
              <>{t('button.addNew')}</>
            </Button>
            <Button to='/staff/account/Bookstore/all' primary>
              <>{t('button.list', { item: 'library' })}</>
            </Button>
          </div>
        </div>
        <TableList loading={isFetching} data={data} />
      </div>
    </div>
  );
}

export default Bookstore;
