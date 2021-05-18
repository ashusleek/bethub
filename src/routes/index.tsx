import React, { Suspense, lazy } from 'react';
import map from 'lodash/map';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import UserRoute from 'routes/UserRoute';

const AuthRoutes = lazy(() => import('pages/Auth'));
const DashbaordRoutes = lazy(() => import('pages/Dashboard'));

const RoutesHOC = (routes: any, DEFAULT_PATH: any) => {
  return function Component() {
    return (
      <Suspense fallback={<div></div>}>
        <Switch>
          {map(routes, route => {
            if (route.isPrivate) {
              return (
                <PrivateRoute
                  key={route.title}
                  title={route.title}
                  path={route.path}
                  component={route.component}
                  defaultPath={DEFAULT_PATH}
                />
              );
            }
            return (
              <UserRoute key={route.title} title={route.title} defaultPath={DEFAULT_PATH} path={route.path} component={route.component} />
            );
          })}
          <Redirect to={DEFAULT_PATH} />
        </Switch>
        {/* <ToastContainer
          transition={Fade}
          closeButton={<CloseButton />}
          position={toast.POSITION.BOTTOM_LEFT}
        /> */}
      </Suspense>
    );
  };
};

export const dashboardRoutes = {};

export const routes = {
  AUTH: {
    path: '/auth',
    title: 'Login',
    component: AuthRoutes,
    isPrivate: false
  },
  DASHBOARD: {
    path: '/dashboard',
    title: 'Dashboard',
    component: DashbaordRoutes,
    isPrivate: true
  }
};

const AppRoutes = RoutesHOC(routes, '/dashboard');
export default AppRoutes;

export const DEFAULT_PATH = '/auth/login';
export const USER_LANDING_PAGE = '/';
