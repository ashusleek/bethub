import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { setReduxKey } from 'state/actions/app';
import CompanyTable from 'components/Dashboard/Admin/CompanyTable';
import {
  createCompanyAction,
  createCompanySuggestionAction,
  deleteCompanyAction,
  deleteCompanyFileAction,
  deleteCompanySuggestionAction,
  downloadCompanyFileAction,
  getComapnyFilesAction,
  getCompaniesAction,
  getCompanyOverviewAction,
  getCompanySuggestionsAction,
  updateCompanyAction,
  updateCompanySuggestionAction,
  uploadCompanyFileAction
} from 'state/actions/company';
import AddEditCompany from 'components/Dashboard/Admin/Forms/AddEditCompany';
import SuggestionTable from 'components/Dashboard/ClientData/SuggestionTable';
import AddEditSuggestion from 'components/Dashboard/ClientData/Forms/AddEditSuggestion';
import ClientData from 'components/Dashboard/ClientData';
import Overview from 'components/Dashboard/Overview';
import FilesTable from 'components/Dashboard/ClientData/FilesTable';

/* -------------------------------------------------------------------------- */
/*                             Admin/CompanyTable                             */
/* -------------------------------------------------------------------------- */

/* ------------------------------- CompayTable ------------------------------ */

const companyTableProps = state => ({
  company: state.companyReducer.company,
  showCompanyModal: state.app.common.showCompanyModal
});

function companyTableDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getCompaniesAction: getCompaniesAction.STARTED,
      deleteCompanyAction: deleteCompanyAction.STARTED,
      setReduxKey
    },
    dispatch
  );
}
export const CompanyTableContainer = connect(companyTableProps, companyTableDispatch)(CompanyTable);

/* ---------------------------- CompanyAddEdit ------------------------------ */

function companyAddEditDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      createCompanyAction: createCompanyAction.STARTED,
      updateCompanyAction: updateCompanyAction.STARTED
    },
    dispatch
  );
}
export const CompanyAddEditContainer = connect(null, companyAddEditDispatch)(AddEditCompany);

/* -------------------------------------------------------------------------- */
/*                                 ClientData                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------- ClientData(Index) --------------------------- */

const clientDataProps = state => ({
  companies: state.companyReducer.company.list,
  user: state.user.current
});

function clientDataDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getCompaniesAction: getCompaniesAction.STARTED
    },
    dispatch
  );
}
export const ClientDataContainer = connect(clientDataProps, clientDataDispatch)(ClientData);

/* ----------------------------- SuggestionTable ---------------------------- */

const suggestionTableProps = state => ({
  suggestion: state.companyReducer.suggestion,
  showSuggestionModal: state.app.common.showSuggestionModal
});

function suggestionTableDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getCompanySuggestionsAction: getCompanySuggestionsAction.STARTED,
      deleteCompanySuggestionAction: deleteCompanySuggestionAction.STARTED,
      setReduxKey
    },
    dispatch
  );
}
export const SuggestionTableContainer = connect(suggestionTableProps, suggestionTableDispatch)(SuggestionTable);

/* ---------------------------- SuggestionAddEdit --------------------------- */

const suggestionAddEditProps = state => ({
  company: state.user.current.company?._id
});

function suggestionAddEditDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      createCompanySuggestionAction: createCompanySuggestionAction.STARTED,
      updateCompanySuggestionAction: updateCompanySuggestionAction.STARTED
    },
    dispatch
  );
}
export const SuggestionAddEditContainer = connect(suggestionAddEditProps, suggestionAddEditDispatch)(AddEditSuggestion);

/* ------------------------------- FilesTable ------------------------------- */

const filesTableProps = state => ({
  file: state.companyReducer.file
});

function filesTableDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getComapnyFilesAction: getComapnyFilesAction.STARTED,
      uploadCompanyFileAction: uploadCompanyFileAction.STARTED,
      downloadCompanyFileAction: downloadCompanyFileAction.STARTED,
      deleteCompanyFileAction: deleteCompanyFileAction.STARTED
    },
    dispatch
  );
}

export const FilesTableContainer = connect(filesTableProps, filesTableDispatch)(FilesTable);

/* -------------------------------------------------------------------------- */
/*                                  Overview                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Overview(Index) ---------------------------- */

const overviewProps = state => ({
  user: state.user.current,
  companies: state.companyReducer.company.list,
  overview: state.companyReducer.company.overview
});

function overviewDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getCompaniesAction: getCompaniesAction.STARTED,
      getCompanyOverviewAction: getCompanyOverviewAction.STARTED
    },
    dispatch
  );
}

export const OverviewContainer = connect(overviewProps, overviewDispatch)(Overview);
