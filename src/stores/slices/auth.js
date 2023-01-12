import { createSlice } from '@reduxjs/toolkit';

const setUser = (state, action) => {
  console.log(action.payload || '');
  // eslint-disable-next-line no-param-reassign
  state.user = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser,
  },
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
