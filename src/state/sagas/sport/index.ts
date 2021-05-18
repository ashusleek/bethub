import { call, takeLatest, put, select, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { GET_SPORTS, GET_SPORT_EVENTS, SET_ACTIVE_EVENTS } from 'state/types';
import { getSportsAction, getSportEventsAction } from 'state/actions/sport';
import toaster from 'utils/toaster';
import SportApi from 'api/sport';

let page = 0,
  limit = 6,
  passedTime = 0,
  PAGE_FLIP_INTERVAL = 30000,
  API_TIME_INTERVAL = 1920000;

function activeEventsChannel(events) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      passedTime = passedTime + PAGE_FLIP_INTERVAL;
      if (passedTime > API_TIME_INTERVAL) {
        emitter(END);
      } else {
        if (page * limit >= events.length) {
          page = 0;
        }
        const activeEvents: any = [];
        for (let i = page * limit; i < page * limit + limit && i < events.length; i++) {
          activeEvents.push(events[i]);
        }
        emitter(activeEvents);
      }
    }, PAGE_FLIP_INTERVAL);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

function* getSports() {
  try {
    const sports = yield call(SportApi.getSports);
    yield put(getSportsAction.FULLFILLED(sports));
  } catch (error) {
    toaster.error('Invalid Username or Password');
  }
}

function* getSportEvents(action) {
  try {
    const events = yield call(SportApi.getSportEvents, action.payload, 'us');
    yield put(getSportEventsAction.FULLFILLED(events));
    if (page === 0) {
      const activeEvents: any = [];
      for (let i = page * limit; i < page * limit + limit && i < events.length; i++) {
        activeEvents.push(events[i]);
      }
      yield put({ type: SET_ACTIVE_EVENTS, payload: { activeEvents, page, limit } });
      page++;
    }
    const channel = yield call(activeEventsChannel, events);
    try {
      while (true) {
        const activeEvents = yield take(channel);
        yield put({ type: SET_ACTIVE_EVENTS, payload: { activeEvents, page, limit } });
        page++;
      }
    } finally {
      passedTime = 0;
      const activeSports = yield select(state => state.sport.activeSports);
      yield put(getSportEventsAction.STARTED(activeSports));
    }
  } catch (error) {
    toaster.error('Invalid Username or Password');
  }
}

/// /////////// Watchers ///////////////////////
export function* watcherSport() {
  yield takeLatest(GET_SPORTS.STARTED, getSports);
  yield takeLatest(GET_SPORT_EVENTS.STARTED, getSportEvents);
}
