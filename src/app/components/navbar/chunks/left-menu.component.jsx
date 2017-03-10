import React from "react";
import About from "../../../pages/about/about.component";
import {Link} from "react-router";

export default class LeftMenu extends React.Component {
    
    render () {
        return (
                <ul className="nav navbar-nav">
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><Link to={About}>About</Link></li>
                </ul>
        );
    }
}