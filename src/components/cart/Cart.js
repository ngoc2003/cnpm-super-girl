import React, { useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import Button from '../Button';
import { Typography } from 'antd';
import Images from '../../images/Images';

function Cart() {
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const cart = useSelector((state) => state.book);

  function handleToggleShow() {
    setShow(!show);
  }
  return (
    <div className='relative'>
      <ShoppingCartOutlined
        className='cursor-pointer'
        onClick={handleToggleShow}
      />
      {show && (
        <ReactModal
          isOpen={show}
          overlayClassName='modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center '
          shouldCloseOnOverlayClick
          onRequestClose={() => setShow(false)}
          className='modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden'
        >
          <div className='h-2 w-full clear-both' />

          {!user ? (
            <div className=' p-2 text-darkGray'>
              Hey bro, you need to{' '}
              <Link className='text-primary' to='/sign-in'>
                log in
              </Link>{' '}
              first to access your cart list!
            </div>
          ) : !cart.length ? (
            <>
              <img src={Images.empty} alt='' />
              <Typography className='italic p-3 text-center'>
                There is no new book order in your cart!!
              </Typography>
              <Button to='/Library' primary fluid>
                Find new book!
              </Button>
            </>
          ) : (
            <>
              <h4 className='inline-block text-xs mb-5 bg-green-100 p-1 text-green-500 rounded-md'>
                Your cart has {cart.length} new order!
              </h4>
              {cart.map((item) => (
                <>
                  <div className='flex gap-5' key={v4()}>
                    <div className='h-[100px] '>
                      <img
                        src={item.image}
                        className='h-full object-cover'
                        alt=''
                      />
                    </div>
                    <div>
                      <h4 className='text-lg'>{item.name}</h4>
                      <p className='text-sm'>{item.author}</p>
                      <p className='text-xs text-darkGray'>x 1</p>
                    </div>
                  </div>
                  <hr className='my-5' />
                </>
              ))}
              <div className='flex gap-5'>
                <Button to='/List' fluid>
                  Find new book!
                </Button>
                <Button to='/Order' primary fluid>
                  Order now!
                </Button>
              </div>
            </>
          )}
        </ReactModal>
      )}
    </div>
  );
}

export default Cart;
