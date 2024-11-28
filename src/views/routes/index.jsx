import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

import Header from '../layout/Header';

function Routes() {
  const AllRoutes = () => useRoutes([...PublicRoutes, ...PrivateRoutes]);

  return (
    <Suspense fallback={<div />}>
      <Router>
        <Header />
        <AllRoutes />
      </Router>
    </Suspense>
  );
}

export default Routes;
