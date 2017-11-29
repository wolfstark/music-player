import reducers from "../reducers";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore({ initialState = {}, history }) {
  const middleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware,middleware))
  );
}
