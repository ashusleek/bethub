import { API_TYPE } from 'utils';

export interface IAction {
  type: string;
  payload?: any;
}

/* -------------------------------------------------------------------------- */
/*                                     APP                                    */
/* -------------------------------------------------------------------------- */
export const SET_REDUX_KEY = 'SET_REDUX_KEY';
export const GET_OVERVIEW_STATS = API_TYPE('GET_OVERVIEW_STATS');

/* --------------------------------- LOADER --------------------------------- */
export const APP = API_TYPE('APP');
export const CLEAR_LOADING = 'CLEAR_LOADING';

/* -------------------------------------------------------------------------- */
/*                                    AUTH                                    */
/* -------------------------------------------------------------------------- */
export const LOGIN = API_TYPE('LOGIN');
export const REGISTER = API_TYPE('REGISTER');
export const SET_USER_STATE = 'SET_USER_STATE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const CLEAR_REDUX = 'CLEAR_REDUX';

/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */

export const USER_INFO = API_TYPE('USER_INFO');
export const GET_USERS = API_TYPE('GET_USERS');
export const ADD_USER = API_TYPE('ADD_USER');
export const UPDATE_USER = API_TYPE('UPDATE_USER');
export const DELETE_USER = API_TYPE('DELETE_USER');
export const CHANGE_PASSWORD = API_TYPE('CHANGE_PASSWORD');

/* -------------------------------------------------------------------------- */
/*                                   COMPANY                                  */
/* -------------------------------------------------------------------------- */

export const GET_COMPANIES = API_TYPE('GET_COMPANIES');
export const CREATE_COMPANY = API_TYPE('CREATE_COMPANY');
export const UPDATE_COMPANY = API_TYPE('UPDATE_COMPANY');
export const DELETE_COMPANY = API_TYPE('DELETE_COMPANY');

export const GET_COMPANY_OVERVIEW = API_TYPE('GET_COMPANY_OVERVIEW');

/* ---------------------------------- FILE ---------------------------------- */

export const GET_COMPANY_FILES = API_TYPE('GET_COMPANY_FILES');
export const UPLOAD_COMPANY_FILE = API_TYPE('UPLOAD_COMPANY_FILE');
export const DOWNLOAD_COMPANY_FILE = API_TYPE('DOWNLOAD_COMPANY_FILE');
export const DELETE_COMPANY_FILE = API_TYPE('DELETE_COMPANY_FILE');

/* ------------------------------- SUGGESTION ------------------------------- */

export const GET_COMPANY_SUGGESTIONS = API_TYPE('GET_COMPANY_SUGGESTIONS');
export const CREATE_COMPANY_SUGGESTION = API_TYPE('CREATE_COMPANY_SUGGESTION');
export const UPDTAE_COMPANY_SUGGESTION = API_TYPE('UPDTAE_COMPANY_SUGGESTION');
export const DELETE_COMPANY_SUGGESTION = API_TYPE('DELETE_COMPANY_SUGGESTION');

/* -------------------------------------------------------------------------- */
/*                                    NEWS                                    */
/* -------------------------------------------------------------------------- */

export const GET_NEWS = API_TYPE('GET_NEWS');
export const CREATE_NEWS = API_TYPE('CREATE_NEWS');
export const UPDATE_NEWS = API_TYPE('UPDATE_NEWS');
export const DELETE_NEWS = API_TYPE('DELETE_NEWS');

/* -------------------------------------------------------------------------- */
/*                                    SPORT                                   */
/* -------------------------------------------------------------------------- */

export const GET_SPORTS = API_TYPE('GET_SPORTS');
export const GET_SPORT_EVENTS = API_TYPE('GET_SPORT_EVENTS');
export const SET_ACTIVE_EVENTS = 'SET_ACTIVE_EVENTS';
