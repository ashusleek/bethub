import { user as initialState } from 'state/reducers/initialState';
import * as actionTypes from 'state/types';
import { IAction } from 'state/types';

function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case actionTypes.USER_INFO.FULLFILLED:
      return {
        ...state,
        current: action.payload
      };

    case actionTypes.GET_USERS.FULLFILLED:
      return {
        ...state,
        list: action.payload
      };

    default:
  }
  return state;
}

export default reducer;
