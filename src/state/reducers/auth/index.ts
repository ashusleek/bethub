import { auth as initialState } from 'state/reducers/initialState';
import * as actionTypes from 'state/types';
import { IAction } from 'state/types';

function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case actionTypes.SET_USER_STATE:
      return {
        ...state,
        userState: action.payload
      };
    // case actionTypes.SHOW_CHANGE_PASSWORD:
    //   return {
    //     ...state,
    //     showChangePassword: action.payload
    //   };
    default:
  }
  return state;
}

export default reducer;
