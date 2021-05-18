import { GET_SPORTS, GET_SPORT_EVENTS } from 'state/types';

export const getSportsAction = {
  STARTED: () => ({ type: GET_SPORTS.STARTED }),
  FULLFILLED: sports => ({ type: GET_SPORTS.FULLFILLED, payload: sports })
};

export const getSportEventsAction = {
  STARTED: (sports: string[]) => ({ type: GET_SPORT_EVENTS.STARTED, payload: sports }),
  FULLFILLED: events => ({ type: GET_SPORT_EVENTS.FULLFILLED, payload: events })
};
