import { ReactNode } from 'react';

interface CheckboxProps {
  checked: boolean;
  name?: string;
  onClick: () => void;
  children: ReactNode | string;
}
function Checkbox({
  checked = false,
  name = '',
  onClick = () => {},
  children,
}) {
  return (
    <div className='flex items-start gap-x-5'>
      <button
        className={`inline-flex items-center text-white justify-center w-5 h-5 border rounded cursor-pointer ${
          checked
            ? 'bg-primary border-primary'
            : 'border-stroke dark:border-text3'
        }`}
        onClick={onClick}
      >
        <input
          name={name}
          type='checkbox'
          className='hidden'
          onChange={() => {}}
        />
        <span className={`${checked ? '' : 'opacity-0 invisible'}`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </span>
      </button>
      {children && <div className='font-medium text-text3'>{children}</div>}
    </div>
  );
}

export default Checkbox;
