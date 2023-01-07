import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    accessToken: null,
  },
  reducers: {
    signIn: (state) => ({
      ...state,
    }),
    signUp: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    updateUser: (state, action) => ({
      ...state,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),
    refreshToken: () => {},
    fetchUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    logOut: () => {},
  },
});

export const { signIn, signUp, updateUser, fetchUser, refreshToken, logOut } =
  authSlice.actions;

export default authSlice.reducer;
