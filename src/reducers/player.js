import * as actionTypes from "../constants/player";
import { playMode } from "../common/js/config";
import { loadSearch, loadPlay, loadFavorite } from "../common/js/cache";

const initialState = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SINGER:
      return { singer: action.payload };
    default:
      return state;
  }
}
