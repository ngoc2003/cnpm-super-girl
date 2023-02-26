import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, AppState } from '../../../stores';
import {
  useLikeBookMutation,
  useUnLikeBookMutation,
} from '../../../stores/services/user';
import { handleUpdate } from '../../../stores/thunk/auth';

const Heart = ({ slug }) => {
  const { user } = useSelector((state: AppState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [likeBook] = useLikeBookMutation();
  const [unLikeBook] = useUnLikeBookMutation();
  const [isLike, setIsLike] = useState(user?.like?.includes(slug));

  function handleLike() {
    if (!user) {
      navigate('/sign-in');
    } else {
      likeBook({
        userId: user?._id,
        bookId: slug,
      })
        .unwrap()
        .then(() => {
          dispatch(handleUpdate({ userId: user?._id }));
          setIsLike(true);
        });
    }
  }

  function hadleUnlike() {
    unLikeBook({
      userId: user?._id,
      bookId: slug,
    })
      .unwrap()
      .then(() => {
        setIsLike(false);
        dispatch(handleUpdate({ userId: user?._id }));
      });
  }

  return (
    <>
      {isLike ? (
        <HeartFilled
          className='text-xl cursor-pointer text-error'
          onClick={hadleUnlike}
        />
      ) : (
        <HeartOutlined
          className='text-xl cursor-pointer'
          onClick={handleLike}
        />
      )}
    </>
  );
};

export default Heart;
