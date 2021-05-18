import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'state/configureStore';
import history from 'utils/history';
import { Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import hmr from 'utils/hmr';
import Routes from 'routes';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CloseButton, Fade } from 'components/Common/Toast';

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
    </Provider>
  );
};

// export default hmr(module, App);
export default App;
