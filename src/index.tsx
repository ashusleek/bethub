import React from 'react';
import ReactDOM from 'react-dom';
// import { hydrate } from 'react-dom';
import './index.css';
import App from './App';
// core styles
import './scss/volt.scss';

// vendor styles
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-datetime/css/react-datetime.css';

import * as serviceWorker from './serviceWorker';

import { loadableReady } from '@loadable/component';
loadableReady(() => {
  //   hydrate(<App />, document.getElementById('root'));
  ReactDOM.render(<App />, document.getElementById('root'));
});

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
