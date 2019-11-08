import {
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
  DELETE_TODO_FAILED,
  REMOVE_MESSAGE
} from "../constants";

export default function data(
  state = {
    todos: [],
    page: 1,
    status: "",
    title: "",
    message: { text: "", type: "" },
    hasMore: true
  },
  action
) {
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
  let newTodos;

  switch (type) {
    case LOAD_TODO_SUCCESS:
      newTodos = page > 1 ? [...state.todos, ...todos] : todos;
      return {
        todos: newTodos.map(todo => ({ ...todo, onEdit: false, sent: true })),
        page,
        status,
        title,
        message: { text: "", type: "" },
        hasMore: newTodos.length > state.todos
      };

    case LOAD_TODO_FAILED:
      return {
        ...state,
        message: { text: "Failed to load data", type: "error" }
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, todo].map(todo => ({
          ...todo,
          onEdit: false,
          sent: true
        })),
        message: { text: message, type: "success" }
      };

    case ADD_TODO_FAILED:
      return {
        ...state,
        message: { text: message, type: "error" }
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          ...(todo.id === id && { isDone })
        })),
        message: { text: "", type: "" }
      };

    case EDIT_ON:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          ...(todo.id === id && { onEdit: true })
        })),
        message: { text: "", type: "" }
      };

    case EDIT_OFF:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          ...(todo.id === id && { onEdit: false })
        })),
        message: { text: "", type: "" }
      };

    case EDIT_TODO:
    case EDIT_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(todoItem => ({
          ...todoItem,
          ...(todoItem.id === todo.id && todo)
        })),
        message: { text: "", type: "" }
      };

    case EDIT_TODO_FAILED:
      return {
        ...state,
        todos: state.todos.map(todoItem => ({
          ...todoItem,
          ...(todoItem.id === todo.id && todo)
        })),
        message: { text: message, type: "error" }
      };

    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== id) };

    case DELETE_TODO_SUCCESS:
      return { ...state, message: { text: message, type: "success" } };

    case DELETE_TODO_FAILED:
      return {
        ...state,
        todos: [...state.todos, todo].sort((obj1, obj2) => obj1.id - obj2.id),
        message: { text: message, type: "error" }
      };

    case REMOVE_MESSAGE:
    default:
      return { ...state, message: { text: "", type: "" } };
  }
}
