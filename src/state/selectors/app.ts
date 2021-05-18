import { createSelector } from 'reselect';

export const getPostmenKey = state => state.app.common.postmenKey;
export const getPostmenKeys = state => state.app.common.postmenKeys;
export const getShippers = state => state.app.common.shippers;
export const getCredentials = state => state.app.common.credentials;

export const getKeyShipper = createSelector([getPostmenKey, getPostmenKeys, getShippers], (postmenKey, postmenKeys, shippers) => {
  let postmenKeyName = postmenKeys.find(p => Number(p.id) === Number(postmenKey));
  const keyShipper = shippers.find(s => s.description === postmenKeyName.name);
  return keyShipper;
});

export const getKeyCredential = createSelector([getPostmenKey, getPostmenKeys, getCredentials], (postmenKey, postmenKeys, credentials) => {
  let postmenKeyName = postmenKeys.find(p => Number(p.id) === Number(postmenKey));
  const keyCredential = credentials.find(s => s.name === postmenKeyName.name);
  return keyCredential;
});
