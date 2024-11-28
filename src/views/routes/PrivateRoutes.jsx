/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import RouterUrls from '../../constants/routeUrls';

const AuthGuard = React.lazy(() => import('./AuthGuard'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));

const PrivateRoutes = [
  {
    path: RouterUrls?.dashboard,
    element: <AuthGuard><Dashboard /></AuthGuard>,
  },
];

export default PrivateRoutes;
