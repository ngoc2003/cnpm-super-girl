import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Images from '../images/Images';
import Review from './bookDetail/review/Review';
import Button from '../components/Button';
import { Interweave } from 'interweave';
import { EMPTY_VALUE } from '../constants';
import { useGetBookQuery } from '../stores/services/book';
import { Spin } from 'antd';
import MotionDefault from '../layouts/motions/MotionDefault';
import { AppState } from '../stores';
import Heart from './bookDetail/heart/Heart';
import { useAddToCartMutation } from '../stores/services/user';

function BookDetail() {
  const { user } = useSelector((state: AppState) => state.auth);
  const { slug } = useParams();
  const { data, isFetching } = useGetBookQuery(slug);

  const [addToCart, { isLoading: isFetchingAddToCart }] =
    useAddToCartMutation();

  if (isFetching) {
    return (
      <div className='flex items-center justify-center min-h-[80vh] w-full'>
        <Spin />
      </div>
    );
  }

  function handleAddCart() {
    addToCart({
      userId: user?._id,
      bookId: slug,
    });
  }

  return (
    <MotionDefault>
      <div className='grid grid-cols-4 gap-10 bg-lightGray py-10 px-5'>
        <div className='text-center'>
          <img
            className='mx-auto box-shadow-creative-large mb-5'
            src={data?.image ?? Images.logo}
            alt=''
          />
          <div className='flex items-center justify-center gap-5'>
            <Button
              isLoading={isFetchingAddToCart}
              onClick={handleAddCart}
              primary
            >
              Add to Cart
            </Button>
            <Heart slug={slug} />
          </div>
        </div>
        <div className='col-span-3'>
          <h4 className='text-3xl font-semibold '>{data?.name}</h4>
          <p className='italic'>
            by <span className='text-blue-400'>{data?.author}</span>{' '}
          </p>
          <p>{EMPTY_VALUE}</p>
          <Interweave content={data?.description}></Interweave>
          <hr className='my-5' />

          <Review id={data?._id} />
        </div>
      </div>
    </MotionDefault>
  );
}

export default BookDetail;
