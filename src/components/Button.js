import React from 'react';
import { useNavigate } from 'react-router-dom';

function Button({
  type = 'button',
  children = <></>,
  to = '',
  className = '',
  primary = false,
  secondary = false,
  third = false,
  fluid = false,
  isLoading = false,
  transparent = false,
  green = false,
  onClick = () => {},
  ...rest
}) {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(to);
  const child = isLoading ? (
    <div className='w-8 h-8 border-4 border-white rounded-full border-t-transparent animate-spin' />
  ) : (
    children
  );
  const btn = (
    <button
      type={type}
      onClick={onClick}
      className={`hover:bg-opacity-80 py-3 text-base min-h-[56px] min-w-[200px] font-semibold px-5 rounded-xl inline-flex items-center justify-center  ${
        primary
          ? 'bg-primary text-white'
          : secondary
          ? 'bg-secondary text-white'
          : third
          ? 'bg-white text-secondary'
          : transparent
          ? 'bg-transparent text-primary'
          : green
          ? 'bg-green text-white'
          : ''
      } ${isLoading && 'pointer-events-none opacity-50'} ${
        fluid && 'w-full'
      } ${className}`}
      {...rest}
    >
      {child}
    </button>
  );
  return to ? (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className='block w-full' onClick={handleNavigate}>
      {btn}
    </div>
  ) : (
    btn
  );
}

export default Button;
