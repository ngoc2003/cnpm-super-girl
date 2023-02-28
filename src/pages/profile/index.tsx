import React from 'react';
import { handleLogout } from '../../stores/thunk/auth';

const Profile = () => {
  return (
    <div>
      <div className='bg-primary px-10 py-3 text-white flex justify-center items-center'>
        <button
          className='px-3 py-1 bg-[gray] rounded-md'
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
