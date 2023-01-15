import { Layout, Typography } from 'antd';
import React from 'react';
import Search from '../Search';

function SearchingDefault({ onClick, onKeyUp }) {
  return (
    <Layout className='flex items-center rounded-xl justify-between gap-5'>
      <Typography className='font-semibold'>Search tools</Typography>
      <div className='flex-1'>
        <Search onClick={onClick} onKeyUp={onKeyUp} max={false} />
      </div>
    </Layout>
  );
}

function SearchBox({
  className = 'bg-lightGray ',
  onClick = () => {},
  onKeyUp = () => {},
}) {
  // const data = [
  //   {
  //     label: 'All',
  //     key: 'All',
  //     children: <SearchingDefault />,
  //   },
  // ];
  return (
    <div className={`${className} px-5 py-5`}>
      <SearchingDefault onClick={onClick} onKeyUp={onKeyUp} />
    </div>
  );
}

export default SearchBox;
