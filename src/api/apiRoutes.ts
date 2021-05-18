import each from 'lodash/each';
import replace from 'lodash/replace';
import { API_BASE_PATH } from 'config';

const ROUTES_OBJ = {
  // APP
  getStats: `${API_BASE_PATH}/app/statistics`,

  // AUTH
  login: `${API_BASE_PATH}/auth/login`,
  refresh: `${API_BASE_PATH}/auth/token/refresh`,
  changePassword: `${API_BASE_PATH}/user/password/change`,

  // USER //
  userInfo: `${API_BASE_PATH}/user/`,
  userList: `${API_BASE_PATH}/user/list`,
  userAddUpdate: `${API_BASE_PATH}/user`,
  userGetDelete: `${API_BASE_PATH}/user/<id>`,

  //NEWS
  newsAddUpdate: `${API_BASE_PATH}/news`,
  newsList: `${API_BASE_PATH}/news/list`,
  newsGetDelete: `${API_BASE_PATH}/news/<id>`,

  //COMPANY
  companyList: `${API_BASE_PATH}/company/list`,
  companyAddUpdate: `${API_BASE_PATH}/company`,
  companyGetDelete: `${API_BASE_PATH}/company/<id>`,

  companyOverview: `${API_BASE_PATH}/company/overview/<id>`,

  companyFileList: `${API_BASE_PATH}/company/<companyId>/file/list`,
  companyFileUpload: `${API_BASE_PATH}/company/<companyId>/file/upload`,
  companyFileDownload: `${API_BASE_PATH}/company/<companyId>/file/link/<fileName>`,
  companyFileDelete: `${API_BASE_PATH}/company/<companyId>/file/<fileName>`,

  companySuggestionList: `${API_BASE_PATH}/company/<companyId>/suggestion/list`,
  companySuggestionAddUpdate: `${API_BASE_PATH}/company/<companyId>/suggestion`,
  companySuggestionGetDelete: `${API_BASE_PATH}/company/<companyId>/suggestion/<id>`,

  //SPORTS
  getSports: `${API_BASE_PATH}/sport`,
  getSportEvents: `${API_BASE_PATH}/sport/events`
};

export type ROUTES = keyof typeof ROUTES_OBJ;
/**
 * getRoute creates the URL through provided routeName & params arguments
 * @param  {string} routeName   any object name of ROUTES_OBJ e.g. login
 * @param  {Object} [params={}] param values replace with strings present <...>.
 * @return {string}             URL
 */
const getRoute = (routeName: ROUTES, params = {}): string => {
  let url: string = ROUTES_OBJ[routeName];
  each(params, (val: string, key: string) => {
    val = Array.isArray(val) ? val.join(',') : val;
    url = replace(url, new RegExp(`<${key}>`, 'g'), encodeURIComponent(val));
    if (typeof val === 'undefined' || val === '' || val === null) {
      url = url
        .replace(new RegExp(`&${key}=`, 'g'), '')
        .replace(new RegExp(`${key}=`, 'g'), '')
        .replace('undefined', '')
        .replace('null', '');
    }
  });
  const regex = /<(.*?)>/;
  let matched: any = [];
  do {
    matched = regex.exec(url);
    if (matched) {
      url = replace(url, new RegExp(matched[0], 'g'), '');
      url = url.replace(new RegExp(`&${matched[1]}=`, 'g'), '').replace(new RegExp(`${matched[1]}=`, 'g'), '');
    }
  } while (matched);
  return url;
};

export default getRoute;
