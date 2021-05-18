import { company as initialState } from 'state/reducers/initialState';
import { GET_COMPANY_FILES, IAction } from 'state/types';

function reducer(state = initialState.files, action: IAction) {
  switch (action.type) {
    case GET_COMPANY_FILES.FULLFILLED:
      return {
        ...state,
        ...action.payload
      };

    default:
  }
  return state;
}

export default reducer;
