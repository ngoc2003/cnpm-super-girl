import React from 'react';

function Search({
  placeholder = 'Do funrise now',
  className = 'flex-1',
  defaultValue = '',
  max = true,
  searchValue,
  onChange = () => {},
  onClick = () => {},
  onKeyUp = () => {},
}) {
  return (
    <div className={`relative  ${className}`}>
      <div
        className={` flex items-center p-2 bg-white rounded-full border w-full ${
          max && 'max-w-[458px]'
        } `}
      >
        <div className='flex-1 pl-4 pr-5'>
          <input
            defaultValue={defaultValue}
            value={searchValue}
            className='w-full text-sm bg-transparent focus:outline-none text-black'
            type='text'
            placeholder={placeholder}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </div>
        <button
          onClick={onClick}
          className='flex-shrink-0 w-[72px] h-10 flex items-center justify-center rounded-full text-white bg-primary'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Search;
