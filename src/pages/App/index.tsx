import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// import { DashboardContainer } from "./containers/dashboard";

const AppRoutes = ({ match: { url } }) => (
  <Switch>
    {/* <Route path={`${url}/`} exact component={DashboardContainer} /> */}
    <Redirect to={`${url}/`} />
  </Switch>
);

export default AppRoutes;
