import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import RouteWithLoader from 'routes/RouteWithLoader';

import { AuthContainer } from './containers/auth';

const AuthRoutes = ({ match: { url } }) => (
  <>
    <Switch>
      <RouteWithLoader path={`${url}/login`} component={AuthContainer} isNav={false} />
      <Redirect to={`${url}/login`} />
    </Switch>
  </>
);

export default AuthRoutes;
