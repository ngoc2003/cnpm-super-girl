import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import Book from '../components/Book/Book';
import Button from '../components/Button';
import i18n from '../services/i18n';
import { useAddRequestMutation } from '../stores/services/request';
import Images from '../images/Images';
import { Spin, Typography } from 'antd';
import { toast } from 'react-toastify';
import MotionDefault from '../layouts/motions/MotionDefault';
import { AppState } from '../stores';
import { useListCartMutation } from '../stores/services/user';
import { BookType } from '../stores/services/typing';

function OrderPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: AppState) => state.auth);

  const [open, setOpen] = useState(false);
  const [listBook, setListBook] = useState<BookType[]>([]);

  const [addRequest, { isLoading }] = useAddRequestMutation();
  const [listCart, { isLoading: isLoadingGetCart }] = useListCartMutation();

  async function handleOrderSubmit() {
    const arr = listBook.map((order) => ({
      userId: user._id,
      bookId: order._id,
      bookName: order.name,
      userName: user.name,
    }));
    if (arr.length) {
      addRequest(arr).then(() => {
        toast.success('Success', {
          pauseOnHover: false,
          autoClose: 1000,
        });
      });
    }
  }

  function handleOrder() {
    setOpen(true);
  }

  useEffect(() => {
    listCart({ userId: user._id })
      .unwrap()
      .then((response) => setListBook(response));
  }, []);

  if (isLoadingGetCart) {
    return (
      <div className='h-[80vh] flex items-PicCenterOutlined justify-center'>
        <Spin />
      </div>
    );
  }

  if (!listBook.length) {
    return (
      <div className='h-[90vh] gap-5 flex items-center justify-center flex-col p-6'>
        <img src={Images.empty} className='w-full max-w-[400px]' alt='' />
        <Typography>
          <>{i18n.t('yourOrder', { count: listBook.length })}</>
        </Typography>
        <div className='flex gap-5'>
          <Button primary to='/Library'>
            <>{i18n.t('button.findNewBook')}</>
          </Button>
          <Button to='/List'>
            <>{i18n.t('button.myListRequest')}</>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <MotionDefault>
      <div className='bg-lightGray px-10 py-5'>
        <div className='flex justify-between items-center gap-5'>
          <h4 className='text-xl'>
            <>{i18n.t('yourOrder', { count: listBook.length })}</>
          </h4>
          <div className='flex gap-5'>
            <Button onClick={handleOrder} primary>
              <>{i18n.t('button.orderNow')}</>
            </Button>
            <Button to='/List' primary>
              <>{i18n.t('button.myListRequest')}</>
            </Button>
          </div>
        </div>
        <hr className='my-3' />
        <div className='grid grid-cols-5 gap-5'>
          {listBook.map((item) => (
            <Book key={item._id} data={item} />
          ))}
        </div>
      </div>
      <ReactModal
        isOpen={open}
        overlayClassName='modal-overlay fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center '
        shouldCloseOnOverlayClick
        onRequestClose={() => setOpen(false)}
        className='modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden'
      >
        <h2 className='clear-both mb-10 text-2xl font-bold text-center '>
          <>
            {i18n.t('question.areYouSureTo', { action: 'order these books' })}
          </>
        </h2>
        <div className='flex gap-x-3'>
          <Button
            isLoading={isLoading}
            primary
            fluid
            onClick={handleOrderSubmit}
          >
            <>{i18n.t('button.accept')}</>
          </Button>
          <Button transparent fluid onClick={() => setOpen(false)}>
            <>{i18n.t('button.cancel')}</>
          </Button>
        </div>
      </ReactModal>
    </MotionDefault>
  );
}

export default OrderPage;
