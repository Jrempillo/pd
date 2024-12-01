import { createSlice } from '@reduxjs/toolkit';

import userReducer from './user.reducer';

import isEmpty from '../../utils/isEmpty';

import { ACCESS_TOKEN, USER_INFORMATION} from '../../constants/storage';

const initialState = {
  isLogin: !isEmpty(localStorage.getItem(ACCESS_TOKEN)) && !isEmpty(localStorage.getItem(USER_INFORMATION)),
  currentUser: !isEmpty(localStorage.getItem(USER_INFORMATION)) ? JSON.parse(localStorage.getItem(USER_INFORMATION)) : {},
  hasError: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducer,
});

export const { loginUser, logoutUser, setErrorLogin } = userSlice.actions;
export const isLogin = (state) => state.user.isLogin;
export const currentUser = (state) => state.user.currentUser;
export const hasErrorUser = (state) => state.user.hasError;

export default userSlice.reducer;
