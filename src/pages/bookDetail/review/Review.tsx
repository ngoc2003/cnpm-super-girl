import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Rate } from 'antd';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import TextAreaInput from '../../../components/TextAreaInput';
import ReviewItem from './item';
import Button from '../../../components/Button';
import { apiURL } from '../../../config/config';
import { AppState } from '../../../stores';

function Review({ id }) {
  const [commentValue, setCommentValue] = useState<string>('');
  const [reviews, setReview] = useState<any>();
  const [star, setStar] = useState<number>(4);
  const [average, setAverage] = useState<number>(0);
  const { user } = useSelector((state: AppState) => state.auth);
  const handleSetComment = (e) => {
    setCommentValue(e.target.value);
  };
  const handleSubmit = async () => {
    if (!user) {
      toast.error('You need to sign in first', {
        pauseOnHover: false,
        autoClose: 1500,
      });
    } else if (!commentValue) {
      toast.error('Your comment is empty baby!', {
        pauseOnHover: false,
        autoClose: 1500,
      });
    } else {
      await axios
        .post(`${apiURL}/review/create`, {
          bookId: id,
          userId: user._id,
          review: commentValue,
          star,
        })
        .then(() => {
          toast.success('Comment success', {
            pauseOnHover: false,
            autoClose: 1500,
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleStar = (num) => {
    setStar(num);
  };

  useEffect(() => {
    const fetchComment = async () => {
      const response = await axios.get(`${apiURL}/review/${id}`);
      setReview(response.data);
    };
    fetchComment();
  }, []);

  useEffect(() => {
    const totalStar =
      reviews.length &&
      reviews
        .map((item) => parseInt(item.star))
        .reduce((total, val) => total + val, 0);

    setAverage(totalStar / reviews.length);
  }, [reviews]);

  return (
    <>
      <div className='flex gap-5 items-center'>
        {average ? <Rate disabled defaultValue={Number(average)} /> : ''}
        <span className=''>({reviews.length} comments)</span>
      </div>
      <div className='bg-white p-3 my-5 pt-5'>
        <FormGroup>
          <Label>Put your star below</Label>
          <Rate defaultValue={star} onChange={handleStar} />
        </FormGroup>
        <FormGroup>
          <Label>Put your comment below</Label>
          <TextAreaInput onChange={handleSetComment} row={5} />
          <Button onClick={handleSubmit} primary>
            Up!
          </Button>
        </FormGroup>
        <div>
          {!!reviews.length &&
            reviews.map((item) => <ReviewItem key={item._id} data={item} />)}
        </div>
      </div>
    </>
  );
}

export default Review;
