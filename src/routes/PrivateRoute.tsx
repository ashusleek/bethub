import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import { getSession, initSession } from 'utils/user';
import { infoAction } from 'state/actions/user';
import history from 'utils/history';
import { Dispatch } from 'redux';
import { Routes } from 'routesLinks';

/**
 * PrivateRoute is used to support the react router and it renders the routes
 * which is marked as private or is only accessible authenticated users
 * @param {React.Component} component
 */
const PrivateRoute = ({ component, ...rest }) => {
  const { defaultPath, userInfo, user } = rest;

  const isAuthenticated = !!getSession();
  useEffect(() => {
    if (isAuthenticated) {
      initSession();
      userInfo();
    } else {
      history.push(Routes.Login);
    }
  }, [isAuthenticated, userInfo]);

  useEffect(() => {
    const location = history.location.pathname;
    if (user.role === 'user' && location.includes('/admin')) {
      history.push(Routes.DashboardOverview.path);
    }
  }, [user]);

  const routeComponent = props => (isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: defaultPath }} />);
  return <Route {...rest} render={routeComponent} pageTitle='' />;
};

const mapProps = (state: any) => {
  return {
    user: state.user.current
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    userInfo: () => dispatch(infoAction.STARTED())
  };
};

export default connect(mapProps, mapDispatchToProps)(PrivateRoute);
