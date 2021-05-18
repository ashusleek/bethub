import { sports as initialState } from 'state/reducers/initialState';

import { GET_SPORTS, GET_SPORT_EVENTS, SET_ACTIVE_EVENTS, IAction } from 'state/types';

function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case GET_SPORTS.FULLFILLED:
      return {
        ...state,
        list: action.payload
      };
    case GET_SPORT_EVENTS.STARTED:
      return {
        ...state,
        activeSports: action.payload
      };
    case GET_SPORT_EVENTS.FULLFILLED:
      return {
        ...state,
        activeSportsEvents: action.payload
      };
    case SET_ACTIVE_EVENTS:
      return {
        ...state,
        activeEvents: {
          list: action.payload.activeEvents,
          page: action.payload.page,
          limit: action.payload.limit
        }
      };
    default:
  }
  return state;
}

export default reducer;
