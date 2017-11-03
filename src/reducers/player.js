import * as actionTypes from '../constants/player';

const initialState = {};

export default function player(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SINGER:
      return { singer: action.payload };
    default:
      return state;
  }
}
