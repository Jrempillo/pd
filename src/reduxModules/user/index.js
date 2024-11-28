import { createSlice } from '@reduxjs/toolkit';

import userReducer from './user.reducer';

import isEmpty from '../../utils/isEmpty';

import { LOCAL_STORAGE_USER_INFORMATION } from '../../constants/storage';

const initialState = {
  isLogin: !isEmpty(localStorage.getItem(LOCAL_STORAGE_USER_INFORMATION)),
  currentUser: !isEmpty(localStorage.getItem(LOCAL_STORAGE_USER_INFORMATION)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_INFORMATION)) : {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducer,
});

export const { loginUser, logoutUser } = userSlice.actions;
export const isLogin = (state) => state.user.isLogin;
export const currentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
