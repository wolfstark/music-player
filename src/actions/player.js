import * as actionTypes from "../constants/player";

export const setSinger = singer => ({
  type: actionTypes.SET_SINGER,
  payload: singer
});
export const setSequenceList = list => ({
  type: actionTypes.SET_SEQUENCE_LIST,
  payload: list
});
export const setPlaylist = list => ({
  type: actionTypes.SET_PLAYLIST,
  payload: list
});
export const setCurrentIndex = index => ({
  type: actionTypes.SET_CURRENT_INDEX,
  payload: index
});
export const setFullScreen = flag => ({
  type: actionTypes.SET_FULL_SCREEN,
  payload: flag
});
export const setPlayingState = flag => ({
  type: actionTypes.SET_PLAYING_STATE,
  payload: flag
});
export const setPlayMode = mode => ({
  type: actionTypes.SET_PLAY_MODE,
  payload: mode
});
export const setDisc = disc => ({
  type: actionTypes.SET_PLAY_MODE,
  payload: disc
});
export const setTopList = topList => ({
  type: actionTypes.SET_TOP_LIST,
  payload: topList
});
export const setSearchHistory = history => ({
  type: actionTypes.SET_SEARCH_HISTORY,
  payload: history
});
export const setPlayHistory = history => ({
  type: actionTypes.SET_PLAY_HISTORY,
  payload: history
});
export const setFavoriteList = list => ({
  type: actionTypes.SET_FAVORITE_LIST,
  payload: list
});

export const setSelectPlay = index => ({
  type: actionTypes.SET_SELECT_PLAY,
  payload: index
});

export const setRandomPlay = list => ({
  type: actionTypes.SET_RANDOM_PLAY,
  payload: list
});
