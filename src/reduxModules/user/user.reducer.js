import { LOCAL_STORAGE_USER_INFORMATION } from '../../constants/storage';

const userReducer = {
  loginUser: (state, action) => {
    
    const user = { name: 'Jo' }
    state.isLogin = true;
    state.currentUser = user;
    localStorage.setItem(LOCAL_STORAGE_USER_INFORMATION, JSON.stringify(user));
  },
  logoutUser: (state) => {
    state.isLogin = false;
    state.currentUser = { };
    localStorage.removeItem(LOCAL_STORAGE_USER_INFORMATION);
  },
};

export default userReducer;
