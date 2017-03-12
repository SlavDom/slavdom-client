import React from "react";
import RightLoggedMenu from "./chunks/right-logged-menu.component";
import RightNotLoggedMenu from "./chunks/right-not-logged-menu.component";
import LeftMenu from "./chunks/left-menu.component";
import {Link} from "react-router";

export default class NavBar extends React.Component {

    render() {
        return (
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container-fluid"/>
                    <div className="navbar-header">
                        <button type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#main-navbar"
                                aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand" activeClassName="active">
                            SlavDom
                        </Link>
                    </div>
                    <div className="navbar-collapse collapse" id="main-navbar">
                        <LeftMenu/>
                        {this.props.logged ? <RightLoggedMenu/> : <RightNotLoggedMenu/> }
                    </div>
                </nav>
        );
    }
}