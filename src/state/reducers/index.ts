import { combineReducers } from 'redux';
import app from 'state/reducers/app';
import auth from 'state/reducers/auth';
import user from 'state/reducers/user';
import sport from 'state/reducers/sport';

export default combineReducers({
  user,
  auth,
  app,
  sport
});
