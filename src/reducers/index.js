import { combineReducers } from "redux";
import player from "./player";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  player,
  router: routerReducer
});
