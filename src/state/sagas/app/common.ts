import { call, put, takeLatest } from 'redux-saga/effects';

import AppApi from 'api/app';
import { GET_OVERVIEW_STATS } from 'state/types';

function* getStatsHandler() {
  try {
    const stats = yield call(AppApi.getStats);
    yield put({ type: GET_OVERVIEW_STATS.FULLFILLED, payload: stats });
  } catch (e) {
    yield put({ type: GET_OVERVIEW_STATS.REJECTED });
  }
}

/// /////////// Watchers ///////////////////////
export function* watcherCommon() {
  yield takeLatest(GET_OVERVIEW_STATS.STARTED, getStatsHandler);
}
