/* eslint-disable no-constant-condition */
import { all } from 'redux-saga/effects';
import { app } from 'state/sagas/app';
import { watcherAuth } from 'state/sagas/auth';
import { userWatcher } from 'state/sagas/user';
import { watcherSport } from 'state/sagas/sport';

export default function* rootSaga() {
  const sagas = [...app, watcherAuth(), userWatcher(), watcherSport()];
  yield all(sagas);
}
