import { push } from "connected-react-router";
import {
  BASE_URL,
  LIMIT,
  LOAD_TODO_SUCCESS,
  LOAD_TODO_FAILED,
  GET_TODO,
  GET_TODO_SUCCESS,
  GET_TODO_FAILED,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILED,
  EDIT_TODO,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILED,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILED
} from "../constants";

BASE_URL += "/todo";

// START LOAD TODO
const loadTodoSuccess = (todos = [], page) => ({
  type: LOAD_TODO_SUCCESS,
  todos,
  page
});

const loadTodoFailed = () => ({ type: LOAD_TODO_FAILED });

export function loadTodos({ page, status, title }) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const { token } = auth;
    if (token) {
      let url = BASE_URL + `/user?skip=${page - 1}&limit=${LIMIT}`;
      if (["all", "done", "undone"].includes(status))
        url += `&filter=${status}`;
      if (title.length > 0) url += `&q=${title}`
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(response => {
          const { data, statusCode } = response;
          if (statusCode === 200) dispatch(loadTodoSuccess(data, page));
          else dispatch(loadTodoFailed());
        })
        .catch(() => dispatch(loadTodoFailed()));
    } else {
      dispatch(loadTodoFailed());
      dispatch(push("/"));
    }
  };
}
// END LOAD TODO
