import { call, takeLatest } from 'redux-saga/effects';
import AuthApi from 'api/auth';
import { LOGIN } from 'state/types';
import history from 'utils/history';
import toaster from 'utils/toaster';
import { Routes } from 'routesLinks';
import { deleteSession, saveUserSession } from 'utils/user';

function* login(action) {
  try {
    const { email, password } = action.payload;
    const { access, refresh, user } = yield call(AuthApi.login, email, password);
    deleteSession();
    saveUserSession({ access, refresh });
    if (user.role === 'user') history.push(Routes.DashboardOverview.path);
    else history.push(Routes.DashboardAdmin.path);
  } catch (error) {
    toaster.error('Invalid Username or Password');
  }
}

/// /////////// Watchers ///////////////////////
export function* watcherAuth() {
  yield takeLatest(LOGIN.STARTED, login);
}

export const auth = [watcherAuth()];
