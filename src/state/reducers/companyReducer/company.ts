import { company as initialState } from 'state/reducers/initialState';
import { GET_COMPANY_OVERVIEW, GET_COMPANY_SUGGESTIONS, GET_COMPANIES, IAction } from 'state/types';

function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case GET_COMPANY_SUGGESTIONS.FULLFILLED:
      return {
        ...state,
        suggestions: action.payload
      };

    case GET_COMPANY_OVERVIEW.FULLFILLED:
      return {
        ...state,
        overview: action.payload
      };

    case GET_COMPANIES.FULLFILLED:
      return {
        ...state,
        list: action.payload
      };
    default:
  }
  return state;
}

export default reducer;
