import React from "react";
import ReactDOM from "react-dom";
import App from "./app/app.component";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import "./index.css";
import About from "./app/pages/about/about.component"
import Home from "./app/pages/home/home.component"

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const rootEl = document.getElementById('root');

ReactDOM.render(
    // <Router history={browserHistory}>
    //     <Route href="/" component={Home}/>
    //     <Route href="/about" component={About}/>
    // </Router>,
    <App/>,
    rootEl
);

// Hot Module Reloading
if (module.hot) {
    module.hot.accept('./app/app.component', () => {
        const NextApp = require('./app/app.component.jsx').default;
        ReactDOM.render(
            <NextApp/>,
            rootEl
        );
    });
}
