import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: any;
}

type UserRoleType = 1 | 0;

export interface ActionUser {
  image?: string; // avatar
  name: string;
  ethnic?: string; // dân tộc
  sex?: string; //giới tính
  language?: string;
  cccd?: string;
  dateCreatedCard?: Date; // ngày làm thẻ
  dateOutCard?: Date; // ngày hết han làm thẻ
  birth?: Date; // ngày sinh
  class?: string;
  location?: string;
  // For authorization
  // password?: string;
  email?: string;
  role?: UserRoleType;
  like?: string[];
}
const setUser: CaseReducer<AuthState, PayloadAction<ActionUser | null>> = (
  state,
  action,
) => {
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
