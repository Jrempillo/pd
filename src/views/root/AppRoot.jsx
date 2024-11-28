import React from 'react';
import { Provider } from 'react-redux';

import store from '../../reduxModules/store';

import Routes from '../routes';

function AppRoot() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default AppRoot;
