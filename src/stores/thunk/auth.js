import { createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from '../slices/auth';
import { SGConnectionInstance } from '../../api/axios';
import { store } from '../index';

export const handleLogout = () => {
  store.dispatch(authActions.setUser(null));
  window.location.replace('/');
};

export const handleSignIn = createAsyncThunk(
  'auth/login',
  async (data, { dispatch }) => {
    try {
      const response = await SGConnectionInstance.post('/auth/sign-in', {
        ...data,
      });
      dispatch(authActions.setUser(response.data));
    } catch (err) {
      console.log(err);
    }
  },
);
