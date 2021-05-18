import { combineReducers } from 'redux';
import company from 'state/reducers/companyReducer/company';
import file from 'state/reducers/companyReducer/file';
import suggestion from 'state/reducers/companyReducer/suggestion';

export default combineReducers({
  company,
  file,
  suggestion
});
