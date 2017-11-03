import * as actionTypes from '../constants/player';

export const setSinger = singer => ({
  type: actionTypes.SET_SINGER,
  payload: singer,
});
