import React, { Component } from "react";
import { connect } from "react-redux";
import { loadTodos } from "../actions/data";
import { logout } from "../actions/auth";
import TodoItem from "./data/TodoItem";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 900 };
  }

  componentDidMount() {
    window.onload = () => this.setWidth(window.screen.width);
    window.addEventListener("resize", () => this.setWidth(window.screen.width));
    this.props.loadData({ page: 1 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () =>
      this.setWidth(window.screen.width)
    );
  }

  setWidth = screenWidth => {
    this.setState({ width: screenWidth >= 900 ? 900 : "97%" });
  };

  render() {
    const { todos, logout } = this.props;
    console.log({ todos });
    return (
      <div
        className="row align-items-center justify-content-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className="card"
          style={{ maxHeight: "95vh", width: this.state.width }}
        >
          <div className="card-header bg-primary">
            <div className="row justify-content-between d-flex align-items-center">
              <div className="col-12 col-sm-8 h2 d-flex align-items-center">
                Pomona Todo App
              </div>
              <div className="col-2 d-flex justify-content-end">
                <button className="btn btn-info" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div
            className="card-body"
            style={{ maxHeight: "85vh", overflowY: "auto" }}
          >
            <ul className="list-group">
              {todos.map(todo => (
                <TodoItem key={todo.id} {...todo} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.data
});

const mapDispatchToProps = dispatch => ({
  loadData: ({ page, status, title }) =>
    dispatch(loadTodos({ page, status, title })),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
