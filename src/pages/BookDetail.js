import React from 'react';
import { useParams } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Images from '../images/Images';
import Review from './bookDetail/review/Review';
import { bookActions } from '../stores/slices/book';
import Button from '../components/Button';
import { Interweave } from 'interweave';
import { EMPTY_VALUE } from '../constants';
import { useGetBookQuery } from '../stores/services/book';
import { Spin } from 'antd';
import MotionDefault from '../layouts/motions/MotionDefault';

function BookDetail() {
  const { user } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetBookQuery(slug);

  if (isFetching) {
    return (
      <div className='flex items-center justify-center min-h-[80vh] w-full'>
        <Spin />
      </div>
    );
  }

  function handleAddCart() {
    if (!user) {
      toast.error('You need to log in to use this feature!', {
        pauseOnHover: false,
        autoClose: 1000,
      });
    } else {
      dispatch(
        bookActions.add({
          ...data,
        }),
      );
    }
  }

  return (
    <MotionDefault>
      <div className='grid grid-cols-4 gap-10 bg-lightGray py-10 px-5'>
        <div className='text-center'>
          <img
            className='mx-auto box-shadow-creative-large mb-5'
            src={data.image ?? Images.logo}
            alt=''
          />
          <div className='flex items-center justify-center gap-5'>
            <Button onClick={handleAddCart} primary>
              Add to Cart
            </Button>
            <HeartOutlined className='text-xl cursor-pointer' />
          </div>
        </div>
        <div className='col-span-3'>
          <h4 className='text-3xl font-semibold '>{data.name}</h4>
          <p className='italic'>
            by <span className='text-blue-400'>{data.author}</span>{' '}
          </p>
          <p>{EMPTY_VALUE}</p>
          <Interweave content={data.description}></Interweave>
          <hr className='my-5' />

          <Review id={data._id} />
        </div>
      </div>
    </MotionDefault>
  );
}

export default BookDetail;
