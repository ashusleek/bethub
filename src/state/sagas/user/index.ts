import { select, call, put, takeLatest } from 'redux-saga/effects';
import UserApi from 'api/user';
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER, USER_INFO, CHANGE_PASSWORD } from 'state/types';
import toaster from 'utils/toaster';
import { copy } from 'utils';
import { setReduxKey } from 'state/actions/app';
import { getUsersAction, infoAction, changePasswordAction } from 'state/actions/user';

function* getUserInfo() {
  try {
    const res = yield call(UserApi.userInfo);
    yield put(infoAction.FULFILLED(res));
  } catch (error) {
    toaster.error('Faild to fetch user info');
  }
}

function* getUsers(action) {
  try {
    const filter = action.payload;
    const res = yield call(UserApi.getUsers, filter);
    if (res.append) {
      let previousState = yield select(state => state.user);
      if (previousState.append) res.list = previousState.list.concat(res.list);
    }
    yield put(getUsersAction.FULFILLED(res.list));
  } catch (error) {
    toaster.error('Faild to fetch users');
  }
}

function* createUser(action) {
  try {
    const user = action.payload;
    const res = yield call(UserApi.createUser, user);
    let previousState = yield select(state => state.user);
    previousState.list.unshift(res);
    previousState.list = copy(previousState.list);
    yield put(getUsersAction.FULFILLED(previousState.list));
    yield put(setReduxKey('showUserModal', false));
  } catch (error) {
    toaster.error('Faild to create user');
  }
}

function* updateUser(action) {
  try {
    const user = action.payload;
    yield call(UserApi.updateUser, user);
    yield put(infoAction.STARTED());
    yield put(setReduxKey('showUserModal', false));
    toaster.success('User updated successfully');
  } catch (error) {
    toaster.error('Faild to update user');
  }
}

function* deleteUser(action) {
  try {
    const userId = action.payload;
    yield call(UserApi.deleteUser, userId);
    let newsState = yield select(state => state.user);
    newsState.list = newsState.list.filter(n => n._id !== userId);
    newsState.total--;
    yield put(getUsersAction.FULFILLED(newsState.list));
  } catch (error) {
    toaster.error('Faild to delete user');
  }
}

function* changePassword(action) {
  try {
    const email = action.payload;
    yield call(UserApi.changePassword, email);
    yield put(changePasswordAction.FULFILLED());
    yield put(setReduxKey('showPasswordModal', false));
    toaster.success('Password successfully changed');
  } catch (error) {
    toaster.error('Faild to change account password');
  }
}

/// /////////// Watchers ///////////////////////
export function* userWatcher() {
  yield takeLatest(USER_INFO.STARTED, getUserInfo);
  yield takeLatest(GET_USERS.STARTED, getUsers);
  yield takeLatest(ADD_USER.STARTED, createUser);
  yield takeLatest(UPDATE_USER.STARTED, updateUser);
  yield takeLatest(DELETE_USER.STARTED, deleteUser);
  yield takeLatest(CHANGE_PASSWORD.STARTED, changePassword);
}
