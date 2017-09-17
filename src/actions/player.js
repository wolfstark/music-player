import * as actionTypes from "../constants/player";

export function login(data) {
  return {
    type: actionTypes.SET_CURRENT_INDEX,
    data
  };
}
