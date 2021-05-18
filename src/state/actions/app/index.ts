import { SET_REDUX_KEY } from 'state/types';
import { GET_OVERVIEW_STATS } from 'state/types';

export const setReduxKey = (key, value) => ({
  type: SET_REDUX_KEY,
  payload: { key, value }
});

export const getOverviewStatsAction = {
  STARTED: () => ({ type: GET_OVERVIEW_STATS.STARTED }),
  FULLFILLED: (stats: { [key: string]: number }) => ({ type: GET_OVERVIEW_STATS.FULLFILLED, payload: stats }),
  REJECTED: () => ({ type: GET_OVERVIEW_STATS.REJECTED })
};
