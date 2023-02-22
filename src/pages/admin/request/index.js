import { t } from 'i18next';
import React from 'react';
import Button from '../../../components/Button';
import TableRequest from '../../../components/TableRequest';
import { useGetAllRequestsQuery } from '../../../stores/services/request';

function Request() {
  const { data, isFetching } = useGetAllRequestsQuery();

  return (
    <div className='bg-lightGray w-full'>
      <div className='bg-white p-3 m-5 h-full'>
        <div className='mb-3 flex gap-3 justify-between'>
          <Button to='/staff/account'>{t('button.back')}</Button>
        </div>
        <TableRequest loading={isFetching} data={data} />
      </div>
    </div>
  );
}

export default Request;
