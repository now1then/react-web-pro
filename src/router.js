import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
// import { renderRoutes } from 'react-router-config';
import renderRoutes from './renderRoutes';
import BasicLayout from '@/layouts/BasicLayout';

const config = [
  {
    component: BasicLayout,
    path: '/we',
    routes: [
      {
        // exact: true,
        path: '/welcome',
        name: '欢迎页',
        icon: 'form',
        component: lazy(() => import('@/pages/Welcome')),
      },
    ]
  }, {
    path: '/test',
    name: '欢迎页',
    icon: 'form',
    component: lazy(() => import('@/pages/Welcome')),
  },
];

const AppRoute = () => {
  if (!Array.isArray(routes)) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Suspense fallback="loading">
          {renderRoutes(config)}
        </Suspense>
        {/* <Redirect path="/" to="/welcome"></Redirect> */}
      </Switch>
    </Router>
  )
}

export default AppRoute;
