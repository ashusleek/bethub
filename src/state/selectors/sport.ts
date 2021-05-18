import { createSelector } from 'reselect';

export const getSports = state => state.sport.list;

export const getKeyCredential = createSelector([getSports], sports => {
  return sports.map(sport => ({ label: sport.title, value: sport.key }));
});
