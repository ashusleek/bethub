import { News } from 'config/interfaces';
import { CREATE_NEWS, GET_NEWS, UPDATE_NEWS, DELETE_NEWS } from 'state/types';

export const getNewsAction = {
  STARTED: filters => ({ type: GET_NEWS.STARTED, payload: filters }),
  FULFILLED: news => ({ type: GET_NEWS.FULLFILLED, payload: news })
};

export const createNewsAction = {
  STARTED: (news: News) => ({ type: CREATE_NEWS.STARTED, payload: news }),
  FULFILLED: () => ({ type: CREATE_NEWS.FULLFILLED })
};

export const updateNewsAction = {
  STARTED: (news: News) => ({ type: UPDATE_NEWS.STARTED, payload: news }),
  FULFILLED: () => ({ type: UPDATE_NEWS.FULLFILLED })
};

export const deleteNewsAction = {
  STARTED: (newsId: string) => ({ type: DELETE_NEWS.STARTED, payload: newsId }),
  FULFILLED: () => ({ type: DELETE_NEWS.FULLFILLED })
};
