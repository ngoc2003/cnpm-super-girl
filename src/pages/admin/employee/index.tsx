import TableEmployee from '../../../components/TableUser';
import Button from '../../../components/Button';
import { useGetAdminsQuery } from '../../../stores/services/admin';
import { Spin } from 'antd';
import { t } from 'i18next';

function Employee() {
  const { data, isFetching } = useGetAdminsQuery();

  if (isFetching) {
    return (
      <div className='flex w-full items-center justify-center min-h-[50vh]'>
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
            <Button to='/staff/account/Employee/add' primary>
              <>Add new Employee</>
            </Button>
          </div>
        </div>
        <TableEmployee type='employee' data={data} />
      </div>
    </div>
  );
}

export default Employee;
