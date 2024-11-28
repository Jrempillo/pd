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
    children
  );
}


export default AuthGuard;
