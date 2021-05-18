import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import RouteWithLoader from 'routes/RouteWithLoader';

import { UserProfileContainer } from 'pages/Dashboard/containers/profile';
import { SportContainer } from 'pages/Dashboard/containers/sport';

const AuthRoutes = ({ match: { url } }) => (
  <Switch>
    <RouteWithLoader exact path={`${url}/profile`} component={UserProfileContainer} />
    <RouteWithLoader exact path={`${url}/sports`} component={SportContainer} />
    <Redirect to={`${url}/sports`} />
  </Switch>
);

export default AuthRoutes;
