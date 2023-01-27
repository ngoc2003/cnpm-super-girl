import React from 'react';
import TableUser from '../../../components/TableUser';
import Button from '../../../components/Button';
import { useGetReadersQuery } from '../../../stores/services/reader';
import { Spin } from 'antd';
import exportUsersToExcel from '../../../utils/exportExcel';
const workSheetColumnName = [
  'STT',
  'Name',
  'Email',
  'Sex',
  'Role',
  'CCCD',
  'Birth',
  'Ethnic',
  'Language',
  'Address',
];
const WORKSHEET_NAME = 'USER LIST';
const FILE_PATH = 'Library_Management_Reader.xlsx';

function Reader() {
  const { data, isFetching } = useGetReadersQuery();

  if (isFetching) {
    return <Spin />;
  }

  const handleExportReader = () => {
    exportUsersToExcel(data, workSheetColumnName, WORKSHEET_NAME, FILE_PATH);
  };

  return (
    <div className='bg-lightGray w-full'>
      <div className='bg-white p-3 m-5 h-full'>
        <div className='mb-3 flex gap-3 justify-between'>
          <Button to={-1}>Back</Button>
          <div className='flex gap-3'>
            <Button className='bg-black text-white'>Black List</Button>
            <Button green onClick={handleExportReader}>
              Exel Export
            </Button>
          </div>
        </div>
        {data.length && <TableUser type='reader' data={data} />}
      </div>
    </div>
  );
}

export default Reader;
