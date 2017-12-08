import { fork, takeEvery, put, select } from "redux-saga/effects";
import * as playersActions from "../actions/player";
import * as actionTypes from "../constants/player";
import { getMode } from "./selectors";
// import api from "../api/singer";
import { playMode } from "../common/js/config";
import { shuffle } from "../common/js/util";

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id;
  });
}

function* watchSelectPlay() {
  yield takeEvery(actionTypes.SET_SELECT_PLAY, selectPlay);
}

function* selectPlay({ payload }) {
  let { list, index } = payload;
  const mode = yield select(getMode);
  yield put(playersActions.setSequenceList(list));

  if (mode === playMode.random) {
    const randomList = shuffle(list);
    index = findIndex(randomList, list[index]);
    yield put(playersActions.setPlaylist(randomList));
  } else {
    yield put(playersActions.setPlaylist(list));
  }

  yield put(playersActions.setCurrentIndex(index));
  yield put(playersActions.setFullScreen(true));
  yield put(playersActions.setPlayingState(true));
}

export default function* root() {
  yield fork(watchSelectPlay);
}
