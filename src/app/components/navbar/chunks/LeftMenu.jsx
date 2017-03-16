import React from "react";
import {Link} from "react-router";

export default class LeftMenu extends React.Component {
    
    render () {
        return (
                <ul className="nav navbar-nav">
                    <li><Link to="/contacts">Contact</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
        );
    }
}
