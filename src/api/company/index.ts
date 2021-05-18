import getRoute from 'api/apiRoutes';
import { API } from 'api';
import { ICompany } from 'config/interfaces';

class CompanyApi extends API {
  createCompany = (company: ICompany): Promise<any> => {
    const route = getRoute('companyAddUpdate');
    return this.postRequest(route, company);
  };

  getCompany = (filter): Promise<any> => {
    const route = getRoute('companyList');
    return this.postRequest(route, filter);
  };

  updateCompany = (news: ICompany): Promise<any> => {
    const route = getRoute('companyAddUpdate');
    return this.patchRequest(route, news);
  };

  deleteCompany = (id: string): Promise<any> => {
    const route = getRoute('companyGetDelete', { id });
    return this.deleteRequest(route);
  };

  getCompanyOverview = (id: string): Promise<any> => {
    const route = getRoute('companyOverview', { id });
    return this.fetch(route);
  };

  /* ---------------------------------- FILES --------------------------------- */

  getCompanyFiles = (companyId: string, filter): Promise<any> => {
    const route = getRoute('companyFileList', { companyId });
    return this.postRequest(route, filter);
  };

  uploadCompanyFile = (files: File[], companyId: string): Promise<any> => {
    const route = getRoute('companyFileUpload', { companyId });
    const formData = new FormData();
    files.forEach(file => {
      formData.append(`file`, file);
    });
    return this.postRequest(route, formData);
  };

  downloadCompanyFile = (companyId: string, fileName: string): Promise<any> => {
    const route = getRoute('companyFileDownload', { companyId, fileName });
    return this.fetch(route);
  };

  deleteCompanyFile = (companyId: string, fileName: string): Promise<any> => {
    const route = getRoute('companyFileDelete', { companyId, fileName });
    return this.deleteRequest(route);
  };

  /* ------------------------------- SUGGESTIONS ------------------------------ */

  getCompanySuggestions = (companyId: string, filter): Promise<any> => {
    const route = getRoute('companySuggestionList', { companyId });
    return this.postRequest(route, filter);
  };

  createCompanySuggestion = (companyId: string, suggestion): Promise<any> => {
    const route = getRoute('companySuggestionAddUpdate', { companyId });
    return this.postRequest(route, suggestion);
  };

  updateCompanySuggestion = (companyId: string, suggestion): Promise<any> => {
    const route = getRoute('companySuggestionAddUpdate', { companyId });
    return this.patchRequest(route, suggestion);
  };

  deleteCompanySuggestion = (companyId: string, id: string): Promise<any> => {
    const route = getRoute('companySuggestionGetDelete', { companyId, id });
    return this.deleteRequest(route);
  };
}

export default new CompanyApi();
