import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';

// components
import Sidebar from 'components/Common/Sidebar';
import Navbar from 'components/Common/Navbar';
// import Footer from 'components/Common/Footer';
import Preloader from 'components/Common/Preloader';
import history from 'utils/history';
import { deleteSession } from 'utils/user';
import { Routes } from 'routesLinks';

const RouteWithSidebar = ({ component: Component, ...rest }) => {
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

  //   const localStorageIsSettingsVisible = () => {
  //     return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  //   };

  //   const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  //   const toggleSettings = () => {
  //     setShowSettings(!showSettings);
  //     localStorage.setItem('settingsVisible', !showSettings as any);
  //   };

  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar user={user} logoutUser={logoutUser} />

          <main className='content'>
            <Navbar user={user} logoutUser={logoutUser} />
            <Component {...props} />
            {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
          </main>
        </>
      )}
    />
  );
};

export default RouteWithSidebar;
