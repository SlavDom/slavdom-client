import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import ReactDOM from "react-dom";
import App from "./app/app.component";
import Home from "./app/pages/home/home.component";
import About from "./app/pages/about/about.component";
import Contacts from "./app/pages/contacts/contacts.component";
import NotFound from "./app/pages/not-found/not-found.component";
import FAQ from "./app/pages/faq/faq.component";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./index.css";

const rootEl = document.getElementById('root');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path="about" component={About}/>
            <Route path="contacts" component={Contacts}/>
            <Route path="faq" component={FAQ}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>,
    rootEl,
);
