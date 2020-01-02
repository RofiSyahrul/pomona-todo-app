import {
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
  REMOVE_MESSAGE,
  CLEAN_TODO
} from '../constants';

const initialState = {
  todos: [],
  page: 1,
  status: '',
  title: '',
  message: { text: '', type: '' },
  hasMore: true
};

export default function data(state = initialState, action) {
  const {
    type,
    todos,
    page,
    status,
    title,
    id,
    isDone,
    message,
    todo
  } = action;

  let newTodos, newHasMore, newTodosId;

  switch (type) {
    case LOAD_TODO_SUCCESS:
      newTodos = page > 1 ? [...state.todos, ...todos] : todos;
      newTodos = newTodos.map(todo => ({ ...todo, onEdit: false, sent: true }));
      // Looking for unique todo.id, return the indices
      newTodosId = newTodos
        .map(todo => todo.id)
        .map((id, i, arr) => arr.indexOf(id))
        .filter((index, i, arr) => arr.indexOf(index) === i);
      // Looking for new todos that have distinc id
      newTodos = newTodos.filter((todo, i) => newTodosId.includes(i));
      newHasMore =
        status === state.status && title === state.title
          ? newTodos.length > state.todos.length
          : true;
      return {
        todos: newTodos,
        page,
        status,
        title,
        message: { text: '', type: '' },
        hasMore: newHasMore
      };

    case LOAD_TODO_FAILED:
      return {
        ...state,
        message: { text: 'Failed to load data', type: 'error' }
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, todo].map(todo => ({
          ...todo,
          onEdit: false,
          sent: true
        })),
        message: { text: message, type: 'success' }
      };

    case ADD_TODO_FAILED:
      return {
        ...state,
        message: { text: message, type: 'error' }
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          ...(todo.id === id && { isDone })
        })),
        message: { text: '', type: '' }
      };

    case EDIT_ON:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          ...(todo.id === id && { onEdit: true })
        })),
        message: { text: '', type: '' }
      };

    case EDIT_OFF:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          ...(todo.id === id && { onEdit: false })
        })),
        message: { text: '', type: '' }
      };

    case EDIT_TODO:
    case EDIT_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(todoItem => ({
          ...todoItem,
          ...(todoItem.id === todo.id && todo)
        })),
        message: { text: '', type: '' }
      };

    case EDIT_TODO_FAILED:
      return {
        ...state,
        todos: state.todos.map(todoItem => ({
          ...todoItem,
          ...(todoItem.id === todo.id && todo)
        })),
        message: { text: message, type: 'error' }
      };

    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== id) };

    case DELETE_TODO_SUCCESS:
      return { ...state, message: { text: message, type: 'success' } };

    case DELETE_TODO_FAILED:
      return {
        ...state,
        todos: [...state.todos, todo].sort((obj1, obj2) => obj1.id - obj2.id),
        message: { text: message, type: 'error' }
      };

    case CLEAN_TODO:
      return initialState;

    case REMOVE_MESSAGE:
    default:
      return { ...state, message: { text: '', type: '' } };
  }
}
