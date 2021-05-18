import { news as initialState } from 'state/reducers/initialState';

import { GET_NEWS, IAction } from 'state/types';

function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case GET_NEWS.FULLFILLED:
      return {
        ...state,
        ...action.payload
      };

    default:
  }
  return state;
}

export default reducer;
