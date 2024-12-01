import { ACCESS_TOKEN, USER_INFORMATION } from '../../constants/storage';
import isEmpty from '../../utils/isEmpty';

const userReducer = {
  loginUser: (state, action) => {
    if (!isEmpty(action?.payload?.user)){
      state.hasError = false;
      state.isLogin = true;
      state.currentUser = action?.payload?.user?.providerData?.[0];
      localStorage.setItem(ACCESS_TOKEN, action?.payload?.user?.accessToken);
      localStorage.setItem(USER_INFORMATION, JSON.stringify(action?.payload?.user?.providerData?.[0]));
    } else {
      state.hasError = true;
    }
  },
  logoutUser: (state) => {
    state.isLogin = false;
    state.currentUser = { };
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_INFORMATION);
  },
  setErrorLogin: (state) => {
    state.hasError = true;
  },
};

export default userReducer;
