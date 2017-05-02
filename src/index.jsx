import 'bootswatch/paper/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './app/App';
import './index.css';
import store from './store';
import setAuthorizationToken from './app/utils/setAuthorizationToken';

setAuthorizationToken(localStorage.jwtToken);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
