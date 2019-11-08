import { push } from "connected-react-router";
import {
  BASE_URL,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "../constants";

// RESPONSE TO REGISTER AND LOGIN
const responseAuth = (
  dispatch,
  doIfSuccess = token => ({ token }),
  doIfFailed = message => ({ message }),
  cb = () => {}
) => {
  return response => {
    cb();
    const { data, statusCode } = response;
    if (statusCode === 200) {
      localStorage.setItem("token", data.token);
      dispatch(doIfSuccess(data.token));
      dispatch(push("/todo"));
    } else dispatch(doIfFailed(data.message));
  };
};

// START REGISTER
const registerSuccess = token => ({
  type: REGISTER_SUCCESS,
  token
});

const registerFailed = message => ({
  type: REGISTER_FAILED,
  message
});

export function register({ name, email, password }, cb) {
  return dispatch => {
    fetch(BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(responseAuth(dispatch, registerSuccess, registerFailed, cb))
      .catch(err => {
        cb();
        dispatch(registerFailed(err.toString()));
      });
  };
}
// END REGISTER

// START LOGIN
const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  token
});

const loginFailed = message => ({
  type: LOGIN_FAILED,
  message
});

export function login({ email, password }, cb) {
  return dispatch => {
    fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(responseAuth(dispatch, loginSuccess, loginFailed, cb))
      .catch(err => {
        cb();
        dispatch(loginFailed(err.toString()));
      });
  };
}
// END LOGIN

// LOG OUT
const logoutRedux = () => ({ type: LOGOUT });

export function logout() {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch(logoutRedux());
    dispatch(push("/"));
  };
}
