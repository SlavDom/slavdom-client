import React from 'react';
import { Link } from 'react-router';

import RightLoggedMenu from './chunks/RightLoggedMenu';
import RightNotLoggedMenu from './chunks/RightNotLoggedMenu';
import LeftMenu from './chunks/LeftMenu';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid" />
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#main-navbar"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/" className="navbar-brand" activeClassName="active">
            SlavDom
          </Link>
        </div>
        <div className="navbar-collapse collapse" id="main-navbar">
          <LeftMenu />
          {this.props.logged
              ? <RightLoggedMenu />
              : <RightNotLoggedMenu lang={this.props.lang} handlerLang={this.props.handlerLang} /> }
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logged: React.PropTypes.bool,
  lang: React.PropTypes.string,
  handlerLang: React.PropTypes.func,
};

Navbar.defaultProps = {
  logged: false,
  lang: '',
  handlerLang: () => {},
};
