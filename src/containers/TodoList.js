import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from '../components/InfiniteScroll';
import { loadTodos, removeMessage } from '../actions/data';
import { logout } from '../actions/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import TodoItem from './data/TodoItem';
import EditTodo from './data/EditTodo';
import AddTodo from './data/AddTodo';
import SearchTodo from './data/SearchTodo';
import FilterTodo from './data/FilterTodo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 900,
      addTodoOn: false,
      page: 1,
      isFetching: false
    };
  }

  componentDidMount() {
    window.onload = () => this.setWidth(window.screen.width);
    window.addEventListener('resize', () => this.setWidth(window.screen.width));
    this.setState({ isFetching: true }, () => {
      this.props.loadData({ page: 1 }, () => {
        this.setState({ isFetching: false });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () =>
      this.setWidth(window.screen.width)
    );
  }

  setWidth = screenWidth => {
    this.setState({ width: screenWidth >= 900 ? 900 : '97%' });
  };

  fetchMoreData = (cb = () => {}) => {
    const { hasMore, loadData, status, title } = this.props;
    let copiedPage = JSON.parse(JSON.stringify([this.state.page]))[0];
    if (!hasMore) loadData({ page: copiedPage + 1, status, title }, cb);
    else
      this.setState(
        state => ({ page: state.page + 1 }),
        () => {
          loadData({ page: this.state.page, status, title }, cb);
        }
      );
  };

  resetPage = () => this.setState({ page: 1 });

  showAddTodo = () => this.setState({ addTodoOn: true });

  hideAddTodo = () => this.setState({ addTodoOn: false });

  render() {
    const { todos, logout, hasMore, status, title } = this.props;
    return (
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ height: '100vh', width: '100vw' }}
      >
        <div
          className='card'
          style={{ maxHeight: '95vh', width: this.state.width }}
        >
          <div className='card-header bg-primary'>
            <div className='row justify-content-between d-flex align-items-center'>
              <div className='col-12 col-sm-8 h3 d-flex align-items-center text-light'>
                Pomona Todo App
              </div>
              <div className='col-2 d-flex align-self-center justify-content-sm-end justify-content-start'>
                <button className='btn btn-info' onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div
            className='card-body'
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
          >
            {this.state.addTodoOn ? (
              <AddTodo cancelAdd={this.hideAddTodo} />
            ) : (
              <button
                className='btn btn-primary my-3'
                onClick={this.showAddTodo}
              >
                <i className='fa fa-plus mx-1' /> Add
              </button>
            )}
            <div className='row justify-content-between d-flex align-items-center'>
              <div className='col-12 col-sm-4'>
                <SearchTodo
                  status={status}
                  title={title}
                  resetPage={this.resetPage}
                />
              </div>
              <div className='col-12 col-sm-8 d-flex align-self-center justify-content-sm-end justify-content-start'>
                <FilterTodo
                  status={status}
                  title={title}
                  resetPage={this.resetPage}
                />
              </div>
            </div>
            <InfiniteScroll
              next={this.fetchMoreData}
              hasMore={hasMore}
              loader={<LoadingSpinner />}
            >
              {this.state.isFetching ? (
                <LoadingSpinner />
              ) : (
                <ul className='list-group'>
                  {todos.map(todo =>
                    todo.onEdit ? (
                      <EditTodo key={todo.id} {...todo} />
                    ) : (
                      <TodoItem key={todo.id} {...todo} />
                    )
                  )}
                </ul>
              )}
            </InfiniteScroll>
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
  logout: () => dispatch(logout()),
  turnOffSwal: () => dispatch(removeMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
