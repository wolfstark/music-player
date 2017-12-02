import { fork, takeEvery, put } from "redux-saga/effects";
import * as playersActions from "../actions/player";
import * as actionTypes from "../constants/player";
import api from "../api/singer";

function* watchSelectPlay() {
  yield takeEvery(actionTypes.SET_SELECT_PLAY, selectPlay);
}

function* selectPlay({ list, index }) {
  yield put(playersActions.setSequenceList(list));
  // if (state.mode === playMode.random) {
  //   let randomList = shuffle(list)
  //   commit(types.SET_PLAYLIST, randomList)1
  //   index = findIndex(randomList, list[index])
  // } else {
  //   commit(types.SET_PLAYLIST, list)
  // }
  // commit(types.SET_CURRENT_INDEX, index)
  // commit(types.SET_FULL_SCREEN, true)
  // commit(types.SET_PLAYING_STATE, true)
}

export default function* root() {
  yield fork(watchSelectPlay);
}
