import { GET_USERS, USER_INFO, ADD_USER, UPDATE_USER, DELETE_USER, CHANGE_PASSWORD } from 'state/types';

export const infoAction = {
  STARTED: () => ({ type: USER_INFO.STARTED }),
  FULFILLED: user => ({ type: USER_INFO.FULLFILLED, payload: user })
};

export const getUsersAction = {
  STARTED: filters => ({ type: GET_USERS.STARTED, payload: filters }),
  FULFILLED: users => ({ type: GET_USERS.FULLFILLED, payload: users })
};

export const createUserAction = {
  STARTED: user => ({ type: ADD_USER.STARTED, payload: user }),
  FULFILLED: () => ({ type: ADD_USER.FULLFILLED })
};

export const updateUserAction = {
  STARTED: user => ({ type: UPDATE_USER.STARTED, payload: user }),
  FULFILLED: () => ({ type: UPDATE_USER.FULLFILLED })
};

export const deleteUserAction = {
  STARTED: (userId: string) => ({ type: DELETE_USER.STARTED, payload: userId }),
  FULFILLED: () => ({ type: DELETE_USER.FULLFILLED })
};

export const changePasswordAction = {
  STARTED: userInfo => ({ type: CHANGE_PASSWORD.STARTED, payload: userInfo }),
  FULFILLED: () => ({ type: CHANGE_PASSWORD.FULLFILLED })
};
