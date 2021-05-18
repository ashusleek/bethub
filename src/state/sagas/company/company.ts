import { select, call, put, takeLatest } from 'redux-saga/effects';
import CompanyApi from 'api/company';
import { setReduxKey } from 'state/actions/app';
import { getCompaniesAction, getCompanyOverviewAction } from 'state/actions/company';
import { CREATE_COMPANY, DELETE_COMPANY, GET_COMPANIES, GET_COMPANY_OVERVIEW, UPDATE_COMPANY } from 'state/types';
import toaster from 'utils/toaster';
import { copy } from 'utils';

function* getCompanies(action) {
  try {
    const filter = action.payload;
    const res = yield call(CompanyApi.getCompany, filter);
    if (res.append) {
      let previousState = yield select(state => state.companyReducer.company);
      if (previousState.append) res.list = previousState.list.concat(res.list);
    }
    yield put(getCompaniesAction.FULFILLED(res.list));
  } catch (error) {
    toaster.error('Faild to fetch companies');
  }
}

function* createCompany(action) {
  try {
    const company = action.payload;
    const res = yield call(CompanyApi.createCompany, company);
    let previousState = yield select(state => state.companyReducer.company);
    previousState.list.unshift(res);
    previousState.list = copy(previousState.list);
    yield put(getCompaniesAction.FULFILLED(previousState.list));
    yield put(setReduxKey('showCompanyModal', false));
  } catch (error) {
    if (!Array.isArray(error) && typeof error !== 'string') {
      Object.values(error).forEach(e => {
        toaster.error(e);
      });
    } else {
      toaster.error('Faild to create company');
    }
  }
}

function* updateCompany(action) {
  try {
    const company = action.payload;
    const res = yield call(CompanyApi.updateCompany, company);
    let previousState = yield select(state => state.companyReducer.company);
    previousState.list = previousState.list.map(n => (n._id === res._id ? res : n));
    yield put(getCompaniesAction.FULFILLED(previousState.list));
    yield put(setReduxKey('showCompanyModal', false));
  } catch (error) {
    toaster.error('Faild to update company');
  }
}

function* deleteCompany(action) {
  try {
    const companyId = action.payload;
    yield call(CompanyApi.deleteCompany, companyId);
    let previousState = yield select(state => state.companyReducer.company);
    previousState.list = previousState.list.filter(n => n._id !== companyId);
    previousState.total--;
    yield put(getCompaniesAction.FULFILLED(previousState.list));
  } catch (error) {
    toaster.error('Faild to delete company');
  }
}

function* getCompanyOverview(action) {
  try {
    const companyId = action.payload;
    if (!companyId) {
      toaster.info('Select Company from dropdown to get information');
    } else {
      const res = yield call(CompanyApi.getCompanyOverview, companyId);
      yield put(getCompanyOverviewAction.FULFILLED(res));
    }
  } catch (error) {
    toaster.error('Faild to delete company');
  }
}

/// /////////// Watchers ///////////////////////
export function* companyWatcher() {
  yield takeLatest(GET_COMPANIES.STARTED, getCompanies);
  yield takeLatest(CREATE_COMPANY.STARTED, createCompany);
  yield takeLatest(UPDATE_COMPANY.STARTED, updateCompany);
  yield takeLatest(DELETE_COMPANY.STARTED, deleteCompany);
  yield takeLatest(GET_COMPANY_OVERVIEW.STARTED, getCompanyOverview);
}
