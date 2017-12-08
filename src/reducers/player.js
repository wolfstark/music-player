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
      return { ...state, singer: action.payload };
    case actionTypes.SET_SEQUENCE_LIST:
      return { ...state, sequenceList: action.payload };
    case actionTypes.SET_PLAYLIST:
      return { ...state, playlist: action.payload };
    case actionTypes.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };
    case actionTypes.SET_FULL_SCREEN:
      return { ...state, fullScreen: action.payload };
    case actionTypes.SET_PLAYING_STATE:
      return { ...state, playing: action.payload };
    default:
      return state;
  }
}
