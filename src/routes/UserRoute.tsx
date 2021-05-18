import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
// import history from 'utils/history';
import { getSession, initSession } from 'utils/user';

/**
 * UserRoute is used to support the react router and it renders the routes
 * which is marked as private or is only accessible authenticated users
 * @param {React.Component} component
 */
const UserRoute = ({ component, ...rest }) => {
  // const { userInfo } = rest;

  const isAuthenticated = !!getSession();

  useEffect(() => {
    if (isAuthenticated) {
      initSession();
      // userInfo();
      // history.push('/');
    }
  }, [isAuthenticated]);
  const routeComponent = props => React.createElement(component, props);
  return <Route {...rest} render={routeComponent} pageTitle='' />;
};

const mapProps = (state: any) => {
  return {
    user: state
  };
};

export default connect(mapProps, {})(UserRoute);
