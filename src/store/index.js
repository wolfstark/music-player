import reducers from "../reducers";
import { routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default function configureStore({initialState,history}) {
  const middleware = routerMiddleware(history);

  return createStore(reducers, composeEnhancers(applyMiddleware(middleware)));
}
