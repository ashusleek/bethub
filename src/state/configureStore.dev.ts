import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from 'state/reducers';
import SagaManager from 'state/sagas/SagaManager';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const store = createStore(
    rootReducer,
    initialState,

    compose(
      composeWithDevTools(applyMiddleware(sagaMiddleware))
      // DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('state/reducers', () => {
      store.replaceReducer(rootReducer);
    });

    module.hot.accept('state/sagas/SagaManager', () => {
      SagaManager.cancelSagas(store);
      require('state/sagas/SagaManager').default.startSagas(sagaMiddleware);
    });
  }

  SagaManager.startSagas(sagaMiddleware);
  // store.runSaga = sagaMiddleware.run
  // store.close = () => store.dispatch(END);
  return store;
}
