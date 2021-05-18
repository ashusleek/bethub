import { select, call, put, takeLatest } from 'redux-saga/effects';
import CompanyApi from 'api/company';
import { getComapnyFilesAction } from 'state/actions/company';
import { DELETE_COMPANY_FILE, DOWNLOAD_COMPANY_FILE, GET_COMPANY_FILES, UPLOAD_COMPANY_FILE } from 'state/types';
import toaster from 'utils/toaster';
import { copy, downloadLink } from 'utils';

function* getCompanyFiles(action) {
  try {
    let { companyId, filter } = action.payload;
    const res = yield call(CompanyApi.getCompanyFiles, companyId, filter);
    if (res.append) {
      let previousState = yield select(state => state.companyReducer.file);
      if (previousState.append) res.list = previousState.list.concat(res.list);
    }
    yield put(getComapnyFilesAction.FULFILLED(res));
  } catch (error) {
    toaster.error('Faild to fetch files');
  }
}

function* uploadCompanyFile(action) {
  try {
    const { files, companyId } = action.payload;
    const res = yield call(CompanyApi.uploadCompanyFile, files, companyId);
    let previousState = yield select(state => state.companyReducer.file);
    previousState.list = res.concat(previousState.list);
    previousState.list = copy(previousState.list);
    yield put(getComapnyFilesAction.FULFILLED(previousState));
  } catch (error) {
    toaster.error('Faild to upload company files');
  }
}

function* downloadCompanyFile(action) {
  try {
    const { fileName, companyId } = action.payload;
    const payload = yield call(CompanyApi.downloadCompanyFile, companyId, fileName);
    downloadLink(payload.url, fileName);
  } catch (error) {
    toaster.error('Faild to download company file');
  }
}

function* deleteCompanyFile(action) {
  try {
    const { fileName, companyId } = action.payload;
    yield call(CompanyApi.deleteCompanyFile, companyId, fileName);
    let previousState = yield select(state => state.companyReducer.file);
    previousState.list = previousState.list.filter(n => n.s3_file_name !== fileName);
    previousState.total--;
    const { list, ...filters } = previousState;
    yield put(getComapnyFilesAction.STARTED(companyId, filters));
  } catch (error) {
    toaster.error('Faild to delete company file');
  }
}

/// /////////// Watchers ///////////////////////
export function* fileWatcher() {
  yield takeLatest(GET_COMPANY_FILES.STARTED, getCompanyFiles);
  yield takeLatest(UPLOAD_COMPANY_FILE.STARTED, uploadCompanyFile);
  yield takeLatest(DOWNLOAD_COMPANY_FILE.STARTED, downloadCompanyFile);
  yield takeLatest(DELETE_COMPANY_FILE.STARTED, deleteCompanyFile);
}
