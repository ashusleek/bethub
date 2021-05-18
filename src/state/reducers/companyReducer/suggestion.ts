import { company as initialState } from 'state/reducers/initialState';
import { GET_COMPANY_SUGGESTIONS, IAction } from 'state/types';

function reducer(state = initialState.suggestions, action: IAction) {
  switch (action.type) {
    case GET_COMPANY_SUGGESTIONS.FULLFILLED:
      return {
        ...state,
        ...action.payload
      };

    default:
  }
  return state;
}

export default reducer;
