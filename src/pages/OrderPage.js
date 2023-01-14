import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import Book from '../components/Book/Book';
import Button from '../components/Button';
import { apiURL } from '../config/config';
import { bookActions } from '../stores/slices/book';
import i18n from '../services/i18n';

function OrderPage() {
  const orders = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  if (!user) {
    return (
      <Link
        to='/sign-in'
        className='h-full bg-lightGray flex items-center justify-center'
      >
        {i18n.t('signInToUseThisPage')}
      </Link>
    );
  }
  function handleOrder() {
    setOpen(true);
  }
  async function handleOrderSubmit() {
    for (let i = 0; i < orders.length; i += 1) {
      await axios.post(`${apiURL}/borrow/create`, {
        userId: user._id,
        bookId: orders[i]._id,
        bookName: orders[i].name,
        userName: user.name,
      });
    }
    dispatch(bookActions.clear());
    setIsLoading(false);
    window.location.replace('/Library');
  }
  return (
    <div>
      <div className='bg-lightGray p-5'>
        <div className='flex justify-between gap-5'>
          <h4 className='text-xl'>
            {i18n.t('yourOrder', { count: orders.length })}
          </h4>
          <Button onClick={handleOrder} primary>
            {i18n.t('button.orderNow')}
          </Button>
        </div>
        <hr className='my-3' />
        <div className='grid grid-cols-5 gap-5'>
          {orders.map((item) => (
            <Book key={item._id} data={item} />
          ))}
        </div>
      </div>
      <ReactModal
        isOpen={open}
        overlayClassName='modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center '
        shouldCloseOnOverlayClick
        onRequestClose={() => setOpen(false)}
        className='modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden'
      >
        <h2 className='clear-both mb-10 text-2xl font-bold text-center '>
          {i18n.t('question.areYouSureTo', { action: 'order these books' })}
        </h2>
        <div className='flex gap-x-3'>
          <Button
            isLoading={isLoading}
            primary
            fluid
            onClick={handleOrderSubmit}
          >
            {i18n.t('button.accept')}
          </Button>
          <Button transparent fluid onClick={() => setOpen(false)}>
            {i18n.t('button.cancel')}
          </Button>
        </div>
      </ReactModal>
    </div>
  );
}

export default OrderPage;
