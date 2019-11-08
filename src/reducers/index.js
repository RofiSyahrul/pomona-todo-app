import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import data from "./data";

export default history =>
  combineReducers({ router: connectRouter(history), auth, data });
