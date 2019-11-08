import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadTodos } from "../actions/data";
import { logout } from "../actions/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import TodoItem from "./data/TodoItem";
import EditTodo from "./data/EditTodo";
import AddTodo from "./data/AddTodo";
import SearchTodo from "./data/SearchTodo";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 900,
      addTodoOn: false,
      page: 1
    };
  }

  componentDidMount() {
    window.onload = () => this.setWidth(window.screen.width);
    window.addEventListener("resize", () => this.setWidth(window.screen.width));
    this.props.loadData({ page: 1 }, () => {});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () =>
      this.setWidth(window.screen.width)
    );
  }

  setWidth = screenWidth => {
    this.setState({ width: screenWidth >= 900 ? 900 : "97%" });
  };

  fetchMoreData = () => {
    const { hasMore, loadData, status, title } = this.props;
    console.log(hasMore);

    if (!hasMore) return;
    this.setState(
      state => ({ page: state.page + 1 }),
      () => {
        loadData({ page: this.state.page, status, title }, () => {});
      }
    );
  };

  showAddTodo = () => this.setState({ addTodoOn: true });

  hideAddTodo = () => this.setState({ addTodoOn: false });

  render() {
    const { todos, logout, hasMore } = this.props;
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className="card"
          style={{ maxHeight: "95vh", width: this.state.width }}
        >
          <div className="card-header bg-primary">
            <div className="row justify-content-between d-flex align-items-center">
              <div className="col-12 col-sm-8 h3 d-flex align-items-center text-light">
                Pomona Todo App
              </div>
              <div className="col-2 d-flex align-self-center justify-content-sm-end justify-content-start">
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
            {this.state.addTodoOn ? (
              <AddTodo cancelAdd={this.hideAddTodo} />
            ) : (
              <button
                className="btn btn-primary my-3"
                onClick={this.showAddTodo}
              >
                <i className="fa fa-plus mx-1" /> Add
              </button>
            )}
            <div className="row justify-content-between d-flex align-items-center">
              <div className="col-5">
                <SearchTodo />
              </div>
            </div>
            <div
              id="scrollable"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <InfiniteScroll
                dataLength={todos.length}
                next={this.fetchMoreData}
                hasMore={hasMore}
                scrollableTarget="scrollable"
                style={{ overflow: "hide" }}
                scrollThreshold={0.8}
                loader={<LoadingSpinner />}
              >
                <ul className="list-group">
                  {todos.map(todo =>
                    todo.onEdit ? (
                      <EditTodo key={todo.id} {...todo} />
                    ) : (
                      <TodoItem key={todo.id} {...todo} />
                    )
                  )}
                </ul>
              </InfiniteScroll>
            </div>
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
  loadData: ({ page, status, title }, cb) =>
    dispatch(loadTodos({ page, status, title }, cb)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
