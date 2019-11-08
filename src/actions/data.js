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
  TOGGLE_TODO,
  EDIT_ON,
  EDIT_OFF,
  EDIT_TODO,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILED,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILED
} from "../constants";

const TODO_URL = BASE_URL + "/todo";

// START LOAD TODO
const loadTodoSuccess = ({ todos = [], page, status, title }) => ({
  type: LOAD_TODO_SUCCESS,
  todos,
  page,
  status,
  title
});

const loadTodoFailed = () => ({ type: LOAD_TODO_FAILED });

export function loadTodos({ page, status, title }) {
  return (dispatch, getState) => {
    const { auth } = getState();
    let { token } = auth;
    if (!token) token = localStorage.getItem("token");
    if (token) {
      let url = TODO_URL + `/user?skip=${page - 1}&limit=${LIMIT}`;
      if (["all", "done", "undone"].includes(status))
        url += `&filter=${status}`;
      if (title) url += `&q=${title}`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(response => {
          const { data, statusCode } = response;
          if (statusCode === 200)
            dispatch(loadTodoSuccess({ todos: data, page, status, title }));
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

// START TOGGLE TODO
const toggleTodoRedux = ({ id, isDone }) => ({ type: TOGGLE_TODO, id, isDone });

export function toggleTodo({ id, isDone }) {
  return dispatch => {
    dispatch(toggleTodoRedux({ id, isDone }));
    const token = localStorage.getItem("token");
    return fetch(`${TODO_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify({ isDone })
    })
      .then(() => {})
      .catch(err => console.log(err));
  };
}
// END TOGGLE TODO

// START EDIT TODO
export function setEditToON(id) {
  return { type: EDIT_ON, id };
}

export function setEditToOFF(id) {
  return { type: EDIT_OFF, id };
}

const editTodoRedux = ({ id, title, priority, note, isDone }) => ({
  type: EDIT_TODO,
  id,
  title,
  priority,
  note,
  isDone
});
// END EDIT TODO

// START DELETE TODO
const deleteTodoRedux = id => ({ type: DELETE_TODO, id });
const deleteTodoSuccess = ({ id, message }) => ({
  type: DELETE_TODO_SUCCESS,
  id,
  message
});
const deleteTodoFailed = (todo = {}) => ({ type: DELETE_TODO_FAILED, todo });

export function deleteTodo(todo = {}) {
  const { id } = todo;
  return dispatch => {
    dispatch(deleteTodoRedux(id));
    return fetch(`${TODO_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(response => {
        const {
          data: { message }
        } = response;
        dispatch(deleteTodoSuccess({ id, message }));
      })
      .catch(() => dispatch(deleteTodoFailed(todo)));
  };
}
// END DELETE TODO
