import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';

import './index.css';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  rootEl,
);
