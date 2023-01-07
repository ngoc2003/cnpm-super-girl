import React from 'react';
import Search from '../Search';

function SearchingDefault({ onClick, onKeyUp }) {
  return (
    <div className='flex items-center rounded-xl justify-between w-full gap-5 mb-5'>
      <h4 className='text-xl font-semibold'>Search tools</h4>

      <div className='flex-1'>
        <Search onClick={onClick} onKeyUp={onKeyUp} max={false} />
      </div>
    </div>
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
