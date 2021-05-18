import { app as initialState } from 'state/reducers/initialState';
import { CLEAR_REDUX, SET_REDUX_KEY, GET_OVERVIEW_STATS } from 'state/types';
import { IAction } from 'state/types';

function reducer(state = initialState.common, action: IAction) {
  switch (action.type) {
    case SET_REDUX_KEY:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    case CLEAR_REDUX:
      return {
        ...state
      };
    case GET_OVERVIEW_STATS.FULLFILLED:
      return {
        ...state,
        ...action.payload
      };
    default:
  }
  return state;
}

export default reducer;
