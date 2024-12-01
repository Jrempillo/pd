import { configureStore } from '@reduxjs/toolkit';

import user from './user';
import data from './data';

export default configureStore({
  reducer: {
    user,
    data,
  },
});
