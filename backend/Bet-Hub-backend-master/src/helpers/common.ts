import bcrypt from 'bcrypt';
import config from 'config';
import axios from 'axios';

import { IAxios } from 'interfaces';

export const getNestedObj = (obj, key) => {
  let result = null;
  for (const prop in obj) {
    if (prop === key) {
      return (result = obj[prop]);
    }
    if (typeof obj[prop] == 'object') {
      return getNestedObj(obj[prop], key);
    }
  }
};

export const generateRandomCode = (maxLength: number) => {
  return Math.random()
    .toString(36)
    .substring(maxLength);
};

export const convertStringToBoolean = (_boolean: string): boolean => {
  if (!_boolean) return false;
  else if (_boolean === 'true') return true;
  else if (_boolean === 'false') return false;
};

export const hashPassword = async (unHashedPassword: string): Promise<string> => {
  return await bcrypt.hash(unHashedPassword, Number(config.bcryptSalt));
};

export const comparePasswords = async (unHashedPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(unHashedPassword, hashedPassword);
};

export const copy = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export const axiosRequest = async (options: IAxios) => {
  /**
   * @TODO Call Through Axios
   * @param {*} method => request method
   * @param {*} url => request api url
   * @param {*} params => request url params
   * @param {*} data => request api body
   * @param {*} headers => request headers e.g. { Content-Type }
   * @param {*} auth => request authentication if any
   * @param {*} responseType => type of response received
   */
  const { method, url, params, data, headers, auth, responseType } = options;
  const response = await axios({ method, url, headers, data, auth, responseType }).catch(error => {
    throw error;
  });
  return response;
};
