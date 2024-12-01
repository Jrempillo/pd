import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import RouterUrls from '../../constants/routeUrls';

import { isLogin } from '../../reduxModules/user';

function AuthGuard({ children }) {
  const isAuthenticated = useSelector(isLogin);
  
  return !isAuthenticated ? (
    <Navigate to={RouterUrls?.login} />
  ) : (
    <div style={{ padding: '20px 15px 0', minHeight: 'calc(100vh - 56px - 40px)'}}>
      {children}
    </div>
  );
}


export default AuthGuard;
