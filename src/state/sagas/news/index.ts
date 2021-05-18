import { select, call, put, takeLatest } from 'redux-saga/effects';
import NewsApi from 'api/news';
import { CREATE_NEWS, DELETE_NEWS, GET_NEWS, UPDATE_NEWS } from 'state/types';
import toaster from 'utils/toaster';
import { getNewsAction } from 'state/actions/news';
import { copy } from 'utils';
import { setReduxKey } from 'state/actions/app';

function* getNews(action) {
  try {
    const filter = action.payload;
    const res = yield call(NewsApi.getNews, filter);
    if (res.append) {
      let newsState = yield select(state => state.news);
      if (newsState.append) res.list = newsState.list.concat(res.list);
    }
    yield put(getNewsAction.FULFILLED(res));
  } catch (error) {
    toaster.error('Faild to fetch news');
  }
}

function* createNews(action) {
  try {
    const news = action.payload;
    const res = yield call(NewsApi.createNews, news);
    let newsState = yield select(state => state.news);
    newsState.list.unshift(res);
    newsState.list = copy(newsState.list);
    yield put(getNewsAction.FULFILLED(newsState));
    yield put(setReduxKey('showNewsModal', false));
  } catch (error) {
    toaster.error('Faild to create news');
  }
}

function* updateNews(action) {
  try {
    const news = action.payload;
    const res = yield call(NewsApi.updateNews, news);
    let newsState = yield select(state => state.news);
    newsState.list = newsState.list.map(n => (n._id === res._id ? res : n));
    yield put(getNewsAction.FULFILLED(newsState));
    yield put(setReduxKey('showNewsModal', false));
  } catch (error) {
    toaster.error('Faild to update news');
  }
}

function* deleteNews(action) {
  try {
    const newsId = action.payload;
    yield call(NewsApi.deleteNews, newsId);
    let newsState = yield select(state => state.news);
    newsState.list = newsState.list.filter(n => n._id !== newsId);
    newsState.total--;
    yield put(getNewsAction.FULFILLED(newsState));
  } catch (error) {
    toaster.error('Faild to delete news');
  }
}

/// /////////// Watchers ///////////////////////
export function* newsWatcher() {
  yield takeLatest(GET_NEWS.STARTED, getNews);
  yield takeLatest(CREATE_NEWS.STARTED, createNews);
  yield takeLatest(UPDATE_NEWS.STARTED, updateNews);
  yield takeLatest(DELETE_NEWS.STARTED, deleteNews);
}

export const news = [newsWatcher()];
