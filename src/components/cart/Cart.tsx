import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import ReactModal from 'react-modal';
import Button from '../Button';
import { Typography, Layout, Space, Spin } from 'antd';
import Images from '../../images/Images';
import { t } from 'i18next';
import { AppState } from '../../stores';
import { useListCartMutation } from '../../stores/services/user';
import { BookType } from '../../stores/services/typing';

function Cart() {
  const { user } = useSelector((state: AppState) => state.auth);
  const [show, setShow] = useState(false);
  const [listBook, setListBook] = useState<BookType[]>([]);
  const [listCart, { isLoading }] = useListCartMutation();
  useEffect(() => {
    if (show) {
      listCart({ userId: user._id })
        .unwrap()
        .then((response) => setListBook(response));
    }
  }, [show]);

  function handleToggleShow() {
    setShow(!show);
  }
  return (
    <Layout className='relative'>
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
          <Layout className='h-2 w-full clear-both' />

          {isLoading ? (
            <div className='h-full w-full flex items-center justify-center'>
              <Spin />
            </div>
          ) : !listBook.length ? (
            <>
              <img src={Images.empty} alt='' />
              <Typography className='italic p-3 text-center'>
                <>{t('cart', { count: listBook.length })}</>
              </Typography>
              <Button to='/Library' primary fluid>
                <>{t('button.findNewBook')}</>
              </Button>
            </>
          ) : (
            <>
              <Typography.Text
                type='success'
                className=' bg-green-100 p-1 rounded-md inline-block mb-5 text-sm'
              >
                <>{t('cart', { count: listBook.length })}</>
              </Typography.Text>
              <Layout>
                {listBook.map((item) => (
                  <>
                    <Space size='large' key={v4()}>
                      <Layout className='h-[100px] '>
                        <img
                          src={item.image}
                          className='h-full object-cover'
                          alt=''
                        />
                      </Layout>
                      <Layout>
                        <h4 className='text-lg'>{item.name}</h4>
                        <p className='text-sm'>{item.author}</p>
                        <p className='text-xs text-darkGray'>x 1</p>
                      </Layout>
                    </Space>
                    <hr className='my-5' />
                  </>
                ))}
              </Layout>
              <div className='flex gap-5'>
                <Button to='/List' fluid>
                  <> {t('button.orderHistory')}</>
                </Button>
                <Button to='/Order' primary fluid>
                  <>{t('button.orderNow')}</>
                </Button>
              </div>
            </>
          )}
        </ReactModal>
      )}
    </Layout>
  );
}

export default Cart;
