import 'bootswatch/paper/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import App from './app/App';
import './index.css';
import store from './store';
import setAuthorizationToken from './app/utils/setAuthorizationToken';
import { setCurrentUser } from './app/actions/authActions';

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
