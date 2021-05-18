import { combineReducers } from 'redux';
import common from 'state/reducers/app/common';
import loader from 'state/reducers/app/loader';

export default combineReducers({
  common,
  loader
});
