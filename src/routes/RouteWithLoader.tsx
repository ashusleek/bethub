import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from 'components/Common/Navbar';
import Preloader from 'components/Common/Preloader';
import history from 'utils/history';
import { deleteSession } from 'utils/user';
import { Routes } from 'routesLinks';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state: any) => state.user.current);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const logoutUser = () => {
    deleteSession();
    history.push(Routes.Login.path);
  };

  return (
    <Route
      {...rest}
      render={props => (
        <>
          {' '}
          <Preloader show={loaded ? false : true} />
          <main className='main-content'>
            {rest.isNav && <Navbar user={user} logoutUser={logoutUser} />}
            <Component {...props} />
            {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
          </main>
        </>
      )}
    />
  );
};

RouteWithLoader.defaultProps = {
  isNav: true
};

export default RouteWithLoader;
