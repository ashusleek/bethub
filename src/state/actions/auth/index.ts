import { LOGIN, LOGOUT_USER, REGISTER, SET_USER_STATE } from 'state/types';
import { deleteSession } from 'utils/user';
import history from 'utils/history';

export const loginAction = {
  STARTED: (email: string, password: string) => ({
    type: LOGIN.STARTED,
    payload: { email, password }
  })
};

export const logoutAction = () => {
  deleteSession();
  history.push('/auth');
  return { type: LOGOUT_USER };
};

export const signupAction = {
  STARTED: user => ({ type: REGISTER.STARTED, payload: { ...user } })
};

export const setUserStateAction = (user: any) => ({
  type: SET_USER_STATE,
  payload: user
});
