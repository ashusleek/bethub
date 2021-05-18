import axios from 'axios';
import getRoute from 'api/apiRoutes';
import { deleteSession, getRefreshToken, saveUserSession } from 'utils/user';
import history from 'utils/history';
import { API } from 'api';
import { Routes } from 'routesLinks';

class AuthApi extends API {
  login = (email: string, password: string): Promise<any> => {
    const route = getRoute('login');
    return this.postRequest(route, { email, password });
  };

  refresh = (refresh_token: string): Promise<any> => {
    const route = getRoute('refresh');
    return this.fetch(route, { refresh_token });
  };
}

const Api = new AuthApi();

axios.interceptors.response.use(undefined, error => {
  const url = error.config.url;
  if (url.includes('auth/token/refresh')) {
    deleteSession();
    history.replace(Routes.Login);
    return Promise.reject(error);
  }
  const skipRoutes = ['auth/'];
  if (error.response && error.response.status === 401) {
    for (const route of skipRoutes) {
      if (url.includes(route)) return Promise.reject(error);
    }
    const refresh_token = getRefreshToken();
    return Api.refresh(refresh_token as string)
      .then(session => {
        saveUserSession(session);
        axios.defaults.headers.common.access = session.access;
        error.config.headers.access = session.access;
        error.config.headers.refresh = session.refresh;
        return axios.request(error.config);
      })
      .catch(e => {
        if (e.response && e.response.status === 401) {
          deleteSession();
          history.push(Routes.Login);
        }
        return Promise.reject(e);
      });
  }
  return Promise.reject(error);
});

export default Api;
