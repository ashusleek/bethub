import { select, call, put, takeLatest } from 'redux-saga/effects';
import CompanyApi from 'api/company';
import { setReduxKey } from 'state/actions/app';
import { getCompanySuggestionsAction } from 'state/actions/company';
import { CREATE_COMPANY_SUGGESTION, DELETE_COMPANY_SUGGESTION, GET_COMPANY_SUGGESTIONS, UPDTAE_COMPANY_SUGGESTION } from 'state/types';
import toaster from 'utils/toaster';
import { copy } from 'utils';

function* getCompanySuggestions(action) {
  try {
    let { companyId, filters } = action.payload;
    const res = yield call(CompanyApi.getCompanySuggestions, companyId, filters);
    if (res.append) {
      let previousState = yield select(state => state.companyReducer.suggestion);
      if (previousState.append) res.list = previousState.list.concat(res.list);
    }
    yield put(getCompanySuggestionsAction.FULFILLED(res));
  } catch (error) {
    toaster.error('Faild to fetch company suggestions');
  }
}

function* createCompanySuggestion(action) {
  try {
    const { companyId, suggestion } = action.payload;
    const res = yield call(CompanyApi.createCompanySuggestion, companyId, suggestion);
    let previousState = yield select(state => state.companyReducer.suggestion);
    previousState.list.unshift(res);
    previousState.list = copy(previousState.list);
    yield put(getCompanySuggestionsAction.FULFILLED(previousState));
    yield put(setReduxKey('showSuggestionModal', false));
  } catch (error) {
    toaster.error('Faild to create company suggestion');
  }
}

function* updateCompanySuggestion(action) {
  try {
    const { company, suggestion } = action.payload;
    const res = yield call(CompanyApi.updateCompanySuggestion, company, suggestion);
    let previousState = yield select(state => state.companyReducer.suggestion);
    previousState.list = previousState.list.map(n => (n._id === res._id ? res : n));
    yield put(getCompanySuggestionsAction.FULFILLED(previousState));
    yield put(setReduxKey('showSuggestionModal', false));
  } catch (error) {
    toaster.error('Faild to update company suggestion');
  }
}

function* deleteCompanySuggestion(action) {
  try {
    const { companyId, id } = action.payload;
    const filters = copy(yield select(state => state.companyReducer.suggestion));
    delete filters.list;

    yield call(CompanyApi.deleteCompanySuggestion, companyId, id);
    yield put(getCompanySuggestionsAction.STARTED(companyId, filters));
  } catch (error) {
    toaster.error('Faild to delete company suggestion');
  }
}

/// /////////// Watchers ///////////////////////
export function* suggestionWatcher() {
  yield takeLatest(GET_COMPANY_SUGGESTIONS.STARTED, getCompanySuggestions);
  yield takeLatest(CREATE_COMPANY_SUGGESTION.STARTED, createCompanySuggestion);
  yield takeLatest(UPDTAE_COMPANY_SUGGESTION.STARTED, updateCompanySuggestion);
  yield takeLatest(DELETE_COMPANY_SUGGESTION.STARTED, deleteCompanySuggestion);
}
