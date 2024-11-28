import React from 'react';

import RouterUrls from '../../constants/routeUrls';

const Login = React.lazy(() => import('../pages/login'));

const PublicRoutes = [
  {
    path: RouterUrls?.login,
    element: <Login />,
    title: 'Login',
  },
  {
    path: '*',
    element: <div>Not found</div>,
    title: 'Not found',
  }
];

export default PublicRoutes;
