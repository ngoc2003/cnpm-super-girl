import React from 'react';
import { Outlet } from 'react-router-dom';
import Images from '../images/Images';

function LayoutAuthen() {
  return (
    <div
      style={{
        background: `url(${Images.bgAuthen}) top center/ cover no-repeat`,
      }}
      className='text-black flex jusify-center items-center min-h-screen lg:py-8'
    >
      <Outlet />
    </div>
  );
}

export default LayoutAuthen;
