import React from "react";
import ReactDOM from "react-dom";
import App from "./app/app.component";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import "./index.css";

const rootEl = document.getElementById('root');

ReactDOM.render(
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
