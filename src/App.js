import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Router } from "react-router-dom";
import store, { history } from "./store";
import AuthPage from './containers/AuthPage';
import TodoList from './containers/TodoList';

function App() {
  const token = localStorage.getItem('token')
  return (
    <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router history={history}>
        <Route exact={Boolean(!token)} path="/" component={AuthPage} />
        <Route exact={Boolean(token)} path="/todo" component={TodoList} />
      </Router>
    </ConnectedRouter>
  </Provider>
  );
}

export default App;
