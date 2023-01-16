import React, { useState, useEffect } from 'react';
import TableList from '../../../components/TableList';
import Button from '../../../components/Button';
import { t } from 'i18next';
import { useGetBooksQuery } from '../../../stores/services/book';

function Bookstore() {
  const { data: books } = useGetBooksQuery();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (books?.length) {
      setLoading(false);
      setData(books);
    }
  }, [books]);

  if (!data?.length) {
    return;
  }

  return (
    <div className='bg-lightGray w-full'>
      <div className='bg-white p-3 m-5 h-full'>
        <div className='mb-3 flex gap-3 justify-between'>
          <Button to='/staff/account'>{t('button.back')}</Button>
          <div className='flex gap-3'>
            <Button to='/staff/account/Bookstore/add' primary>
              {t('button.addNew')}
            </Button>
            <Button to='/staff/account/Bookstore/all' primary>
              {t('button.list', { item: 'library' })}
            </Button>
          </div>
        </div>
        <TableList loading={loading} data={data} />
      </div>
    </div>
  );
}

export default Bookstore;
