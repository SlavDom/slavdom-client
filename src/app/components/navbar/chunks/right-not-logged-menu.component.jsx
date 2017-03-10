import React from "react";
import Login from "./login.component";
import Register from "./register.component";

class RightNotLoggedMenu extends React.Component {
    render () {
        return (
                <ul className="nav navbar-nav navbar-right">
                    <Login/>
                    <Register/>
                </ul>
        );
    }
}

export default RightNotLoggedMenu;