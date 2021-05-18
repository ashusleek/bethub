import axios from 'axios';
import isFunction from 'lodash/isFunction';
import size from 'lodash/size';
import { LOGOUT_ON_API_401 } from 'config';
import getRoute from 'api/apiRoutes';
import { IError } from 'api/types';

const initVal = {
  _cancelToken: null
};

export class API {
  _cancelToken = initVal._cancelToken;

  requestTokens = {};

  CancelToken = axios.CancelToken;

  failedResponse = (error: IError, callback?): Promise<any> => {
    if (LOGOUT_ON_API_401 && error.response && error.response.status && error.response.status === 401) {
    }
    if (typeof error === 'string') {
      return Promise.reject(error);
    }
    const data = error.response && error.response.data ? error.response.data : {};
    if (callback && isFunction(callback)) {
      callback(data);
    }
    return Promise.reject(data);
  };

  fetch = (route: string, callback?, config?: Record<string, any>): Promise<any> => {
    let axiosConfig = {};
    if (!route) {
      return Promise.reject();
    }
    if (config && size(config) > 0) {
      axiosConfig = {
        ...config
      };
    }

    return axios
      .get(route, { ...axiosConfig })
      .then(response => {
        this._cancelToken = initVal._cancelToken;
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        }
        return this.failedResponse(error, callback);
      });
  };

  postRequest = (route: string, data = {}, config?, callback?): Promise<any> => {
    this.requestTokens[route] = this.CancelToken.source();
    return axios
      .post(route, data, config)
      .then(response => {
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };

  patchRequest = (route: string, data?: any, callback?): Promise<any> => {
    return axios
      .patch(route, data)
      .then(response => {
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };

  putRequest = (route: string, data = {}, config?: any, callback?): Promise<any> => {
    return axios
      .put(route, data, config)
      .then(response => {
        if (callback && isFunction(callback)) {
          callback(response.data);
        }
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };

  deleteRequest = (route: string, callback?) => {
    return axios
      .delete(route)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return this.failedResponse(error, callback);
      });
  };

  cancelRequest = (type: string) => {
    const route = getRoute(type as any);
    if (this.requestTokens[route]) this.requestTokens[route].cancel();
  };
}

export default new API();
