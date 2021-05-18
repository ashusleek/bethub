import { APP, CLEAR_LOADING } from 'state/types';

export const appLoadingAction = {
  STARTED: () => ({ type: APP.STARTED }),
  FULLFILLED: () => ({ type: APP.FULLFILLED }),
  REJECTED: () => ({ type: APP.REJECTED })
};
export const clearLoadingAction = () => ({ type: CLEAR_LOADING });
