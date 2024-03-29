import { push } from 'connected-react-router';
import {
  BASE_URL,
  LIMIT,
  LOAD_TODO_SUCCESS,
  LOAD_TODO_FAILED,
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
  DELETE_TODO_FAILED,
  REMOVE_MESSAGE
} from '../constants';
import { showNotif } from '../helpers/showNotif';

const TODO_URL = BASE_URL + '/todo';

// START LOAD TODO
const loadTodoSuccess = ({ todos = [], page, status, title }) => ({
  type: LOAD_TODO_SUCCESS,
  todos,
  page,
  status,
  title
});

const loadTodoFailed = () => ({ type: LOAD_TODO_FAILED });

export function loadTodos({ page, status, title }, cb = () => {}) {
  return (dispatch, getState) => {
    const { auth } = getState();
    let { token } = auth;
    if (!token) token = localStorage.getItem('token');
    if (token) {
      let url = TODO_URL + `/user?skip=${page - 1}&limit=${LIMIT}`;
      if (['all', 'done', 'undone'].includes(status))
        url += `&filter=${status}`;
      if (title) url += `&q=${title}`;
      fetch(url, {
        method: 'GET',
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
          cb();
        })
        .catch(() => {
          dispatch(loadTodoFailed());
          cb();
        });
    } else {
      dispatch(loadTodoFailed());
      dispatch(push('/'));
      cb();
    }
  };
}
// END LOAD TODO

// START ADD TODO
const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  todo,
  message: `${todo.title} has been added to todo list.`
});

const addTodoFailed = (message = 'Failed to add todo') => ({
  type: ADD_TODO_FAILED,
  message
});

export function addTodo({ title, priority, note }, cb = () => {}) {
  return dispatch => {
    return fetch(TODO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ title, priority, note })
    })
      .then(res => res.json())
      .then(response => {
        const { data, statusCode } = response;
        let message, type;
        if (statusCode === 200) {
          dispatch(addTodoSuccess(data));
          message = `${data.title} has been added to todo list.`;
          type = 'success';
        } else {
          message = 'Add todo failed.';
          type = 'error';
          dispatch(addTodoFailed(message));
        }
        cb();
        showNotif({ text: message, type });
      })
      .catch(() => {
        dispatch(addTodoFailed());
        cb();
        showNotif({ text: 'Add todo failed.', type: 'error' });
      });
  };
}
// END ADD TODO

// START TOGGLE TODO
const toggleTodoRedux = ({ id, isDone }) => ({ type: TOGGLE_TODO, id, isDone });

export function toggleTodo({ id, isDone }) {
  return dispatch => {
    dispatch(toggleTodoRedux({ id, isDone }));
    const token = localStorage.getItem('token');
    return fetch(`${TODO_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

const editTodoRedux = newTodo => ({ type: EDIT_TODO, todo: newTodo });

const editTodoSuccess = newTodo => ({ type: EDIT_TODO_SUCCESS, todo: newTodo });

const editTodoFailed = ({ oldTodo, message }) => ({
  type: EDIT_TODO_FAILED,
  todo: oldTodo,
  message
});

export function editTodo(newTodo = {}, oldTodo = {}) {
  return dispatch => {
    const { id } = newTodo;
    dispatch(editTodoRedux(newTodo));
    dispatch(setEditToOFF(id));
    return fetch(`${TODO_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(response => {
        const { data, statusCode } = response;
        let message, type;
        if (statusCode === 200) {
          message = 'Edit success';
          type = 'success';
          dispatch(editTodoSuccess(data));
        } else {
          message = 'Edit failed';
          type = 'error';
          dispatch(
            editTodoFailed({
              oldTodo,
              message
            })
          );
        }
        showNotif({ text: message, type });
      })
      .catch(() => {
        showNotif({ text: 'Edit failed.', type: 'error' });
        dispatch(editTodoFailed({ oldTodo, message: 'Edit failed.' }));
      });
  };
}
// END EDIT TODO

// START DELETE TODO
const deleteTodoRedux = id => ({ type: DELETE_TODO, id });

const deleteTodoSuccess = ({ id, message }) => ({
  type: DELETE_TODO_SUCCESS,
  id,
  message
});

const deleteTodoFailed = ({ todo = {}, message }) => ({
  type: DELETE_TODO_FAILED,
  todo,
  message
});

export function deleteTodo(todo = {}) {
  const { id } = todo;
  return (dispatch, getState) => {
    dispatch(deleteTodoRedux(id));
    return fetch(`${TODO_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(response => {
        let {
          data: { message },
          statusCode
        } = response;
        let type;
        if (statusCode === 200) {
          type = 'success';
          const { page, status, title, todos } = getState().data;
          if (page === 1 || todos.length <= LIMIT)
            dispatch(loadTodos({ page: 1, status, title }));
          dispatch(deleteTodoSuccess({ id, message }));
        } else {
          message = 'You must be logged in. Delete failed.';
          type = 'error';
          dispatch(deleteTodoFailed({ todo, message }));
          dispatch(push('/'));
        }
        showNotif({ text: message, type });
      })
      .catch(() => {
        showNotif({ text: 'Delete failed.', type: 'error' });
        dispatch(deleteTodoFailed({ todo, message: 'Delete failed.' }));
      });
  };
}
// END DELETE TODO

export const removeMessage = () => ({ type: REMOVE_MESSAGE });
