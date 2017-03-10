import React from "react";
import ReactDOM from "react-dom";
import App from "./app.component.jsx";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});
