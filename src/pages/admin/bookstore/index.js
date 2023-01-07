import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableList from '../../../components/TableList';
import Button from '../../../components/Button';
import { apiURL } from '../../../config/config';

function Bookstore() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      const response = await axios.get(`${apiURL}/books/all`);
      if (response.status) {
        setLoading(false);
      }
      setData(response.data);
    }
    fetchBook();
  }, []);
  return (
    <div className='bg-lightGray w-full'>
      <div className='bg-white p-3 m-5 h-full'>
        <div className='mb-3 flex gap-3 justify-between'>
          <Button to='/staff/account'>Back</Button>
          <div className='flex gap-3'>
            <Button to='/staff/account/Bookstore/add' primary>
              Add new
            </Button>
            <Button to='/staff/account/Bookstore/all' primary>
              List Library
            </Button>
          </div>
        </div>
        <TableList loading={loading} data={data} />
      </div>
    </div>
  );
}

export default Bookstore;
