import { createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from '../slices/auth';
import { SGConnectionInstance } from '../../api/axios';
import { store } from '../index';
import { toast } from 'react-toastify';

interface SignInBody {
  email: string;
  password: string;
}

interface SignUpBody extends SignInBody {
  name: string;
}

export const handleLogout = () => {
  store.dispatch(authActions.setUser(null));
  toast.success('Log Out Successfully!');
  window.location.replace('/');
};

export const handleSignIn = createAsyncThunk(
  'auth/login',
  async (data: SignInBody, { dispatch }) => {
    try {
      const response = await SGConnectionInstance.post('/auth/sign-in', data);
      toast.success(`Welcom Back ${response.data.name}!`);
      dispatch(authActions.setUser(response.data));
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const handleSignUp = createAsyncThunk(
  'auth/signUp',
  async (data: SignUpBody) => {
    try {
      await SGConnectionInstance.post('/auth/sign-up', data);
      toast.success('Sign Up successfully!');
    } catch (err) {
      throw new Error(err);
    }
  },
);
