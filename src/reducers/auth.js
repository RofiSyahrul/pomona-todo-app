import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "../constants";

export default function auth(state = { token: "", message: "" }, action) {
  const { type, token, message } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { token, message: "" };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
      return { token: "", message };
    case LOGOUT:
      return { token: "", message: "" };
    default:
      return state;
  }
}
