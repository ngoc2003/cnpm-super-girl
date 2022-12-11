import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    accessToken: null,
  },
  reducers: {
    signIn: (state, action) => {
      return {
        ...state,
      };
    },
    signUp: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateUser: (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    },
    refreshToken: (state, action) => {},
    fetchUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logOut:(state,action) => {}
  },
});

export const { signIn, signUp, updateUser, fetchUser, refreshToken, logOut } =
  authSlice.actions;

export default authSlice.reducer;
