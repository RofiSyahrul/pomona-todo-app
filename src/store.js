import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export default createStore(
  rootReducers(history), // root reducer with router state
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    )
  )
);
