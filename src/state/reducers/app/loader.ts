import { CLEAR_LOADING } from 'state/types';

function reducer(state = {}, action: any) {
  if (action.type.includes('_LOADING_INC') || action.type.includes('_LOADING_DEC')) {
    return {
      ...state,
      [action.state]: action.payload
    };
  }

  if (action.type === CLEAR_LOADING) {
    return {};
  }
  return state;
}

export default reducer;
