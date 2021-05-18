import {
  CREATE_COMPANY,
  GET_COMPANIES,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  GET_COMPANY_FILES,
  UPLOAD_COMPANY_FILE,
  DOWNLOAD_COMPANY_FILE,
  DELETE_COMPANY_FILE,
  GET_COMPANY_OVERVIEW,
  GET_COMPANY_SUGGESTIONS,
  CREATE_COMPANY_SUGGESTION,
  UPDTAE_COMPANY_SUGGESTION,
  DELETE_COMPANY_SUGGESTION
} from 'state/types';
import { ICompany, ISuggestion } from 'config/interfaces';

export const getCompaniesAction = {
  STARTED: filters => ({ type: GET_COMPANIES.STARTED, payload: filters }),
  FULFILLED: companies => ({ type: GET_COMPANIES.FULLFILLED, payload: companies })
};

export const createCompanyAction = {
  STARTED: (company: ICompany) => ({ type: CREATE_COMPANY.STARTED, payload: company }),
  FULFILLED: () => ({ type: CREATE_COMPANY.FULLFILLED })
};

export const updateCompanyAction = {
  STARTED: (news: ICompany) => ({ type: UPDATE_COMPANY.STARTED, payload: news }),
  FULFILLED: () => ({ type: UPDATE_COMPANY.FULLFILLED })
};

export const deleteCompanyAction = {
  STARTED: (companyId: string) => ({ type: DELETE_COMPANY.STARTED, payload: companyId }),
  FULFILLED: () => ({ type: DELETE_COMPANY.FULLFILLED })
};

export const getCompanyOverviewAction = {
  STARTED: (id: string) => ({ type: GET_COMPANY_OVERVIEW.STARTED, payload: id }),
  FULFILLED: overview => ({ type: GET_COMPANY_OVERVIEW.FULLFILLED, payload: overview })
};

/* ---------------------------------- FILE ---------------------------------- */

export const getComapnyFilesAction = {
  STARTED: (companyId: string, filter) => ({ type: GET_COMPANY_FILES.STARTED, payload: { companyId, filter } }),
  FULFILLED: files => ({ type: GET_COMPANY_FILES.FULLFILLED, payload: files })
};

export const uploadCompanyFileAction = {
  STARTED: (files: File[], companyId: string) => ({ type: UPLOAD_COMPANY_FILE.STARTED, payload: { files, companyId } }),
  FULFILLED: () => ({ type: UPLOAD_COMPANY_FILE.FULLFILLED })
};

export const downloadCompanyFileAction = {
  STARTED: (companyId: string, fileName: string) => ({ type: DOWNLOAD_COMPANY_FILE.STARTED, payload: { companyId, fileName } }),
  FULFILLED: () => ({ type: DOWNLOAD_COMPANY_FILE.FULLFILLED })
};

export const deleteCompanyFileAction = {
  STARTED: (companyId: string, fileName: string) => ({ type: DELETE_COMPANY_FILE.STARTED, payload: { companyId, fileName } }),
  FULFILLED: () => ({ type: DELETE_COMPANY_FILE.FULLFILLED })
};

/* ------------------------------- SUGGESTION ------------------------------- */

export const getCompanySuggestionsAction = {
  STARTED: (companyId, filters) => ({ type: GET_COMPANY_SUGGESTIONS.STARTED, payload: { companyId, filters } }),
  FULFILLED: suggestions => ({ type: GET_COMPANY_SUGGESTIONS.FULLFILLED, payload: suggestions })
};

export const createCompanySuggestionAction = {
  STARTED: (companyId: string, suggestion: ISuggestion) => ({
    type: CREATE_COMPANY_SUGGESTION.STARTED,
    payload: { suggestion, companyId }
  }),
  FULFILLED: () => ({ type: CREATE_COMPANY_SUGGESTION.FULLFILLED })
};

export const updateCompanySuggestionAction = {
  STARTED: (company, suggestion: ISuggestion) => ({ type: UPDTAE_COMPANY_SUGGESTION.STARTED, payload: { suggestion, company } }),
  FULFILLED: () => ({ type: UPDTAE_COMPANY_SUGGESTION.FULLFILLED })
};

export const deleteCompanySuggestionAction = {
  STARTED: (companyId: string, id: string) => ({ type: DELETE_COMPANY_SUGGESTION.STARTED, payload: { companyId, id } }),
  FULFILLED: () => ({ type: DELETE_COMPANY_SUGGESTION.FULLFILLED })
};
