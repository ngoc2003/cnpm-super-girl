import { Spin } from 'antd';
import { FormikErrors } from 'formik';
import { useState } from 'react';
import IconEyeToggle from '../icons/IconEyeToggle';
import IconUpload from '../icons/IconUpload';

interface InputProps {
  icon?: boolean;
  isFile?: boolean;
  onChange: (e?: any) => void;
  url?: string;
  defaultValue?: string;
  isLoadingFile?: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  placeholder?: string;
  className?: string;
  name?: string;
}

export default function Input({
  icon = false,
  isFile = false,
  onChange = () => {},
  url,
  defaultValue,
  isLoadingFile = false,
  error = '',
  placeholder,
  className = '',
  name = '',
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return isFile ? (
    <label
      className={`${
        className || ''
      } min-h-[250px] cursor-pointer flex items-center justify-center border border-dashed w-full rounded-lg  relative overflow-hidden group`}
    >
      <input type='file' className='hidden-input hidden' onChange={onChange} />

      <div className='flex flex-col items-center text-center pointer-events-none'>
        <IconUpload />
        <p className='font-semibold'>Choose photo</p>
        {url && (
          <div className='absolute inset-0 object-cover flex items-center justify-center'>
            <img src={url} className='object-cover  h-full' alt='' />
          </div>
        )}
        {isLoadingFile && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Spin />
          </div>
        )}
      </div>
    </label>
  ) : (
    <>
      <div
        className={`z-0 items-center flex border rounded-xl overflow-hidden hover:border-blue-400 text-text1  duration-200 ${
          error.length > 0
            ? 'border-error'
            : 'border-stroke dark:border-darkStroke'
        }`}
      >
        <input
          name={name}
          type={!showPassword && icon ? 'password' : 'text'}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          className='outline-none  px-3  bg-transparent w-full py-3 smallTablet:py-4  font-medium text-sm dark:placeholder:text-text2 placeholder:text-text4    '
          {...props}
        />
        {icon && (
          <IconEyeToggle
            toggle={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      {error.length > 0 && (
        <span className=' text-sm font-medium pointer-events-none text-error '>
          <>{error}</>
        </span>
      )}
    </>
  );
}
