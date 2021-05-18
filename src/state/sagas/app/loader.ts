import { takeLatest, put, select } from 'redux-saga/effects';

/// /////////// Handlers ///////////////////////
function* incrementLoading(action) {
  const actionType = action.type.replace('_STARTED', '');
  const payload = yield select(state => state.app.loader[actionType]);
  const newAction = {
    type: `${actionType}_LOADING_INC`,
    payload: payload ? Number(payload) + 1 : 1,
    state: actionType
  };
  yield put(newAction);
}

function* decrementLoading(action) {
  const actionType = action.type.replace('_FULLFILLED', '').replace('_REJECTED', '');
  const payload = yield select(state => state.app.loader[actionType]);
  const newAction = {
    type: `${actionType}_LOADING_DEC`,
    payload: payload ? Number(payload) - 1 : 0,
    state: actionType
  };
  yield put(newAction);
}

/// /////////// Watchers ///////////////////////
export function* watcherLoader() {
  yield takeLatest(action => /STARTED$/.test(action.type), incrementLoading);
  yield takeLatest(action => /(FULLFILLED|REJECTED)$/.test(action.type), decrementLoading);
}
