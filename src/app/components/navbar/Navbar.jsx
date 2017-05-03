import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RightLoggedMenu from './chunks/RightLoggedMenu';
import RightNotLoggedMenu from './chunks/RightNotLoggedMenu';
import LeftMenu from './chunks/LeftMenu';
import { toEnglish, toInterslavic, toNovoslovnica } from '../../actions/languageChoice';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { lang } = nextProps;
    const previousValueLang = this.state.lang;
    const currentValueLang = lang;
    if (currentValueLang !== previousValueLang) {
      this.setState({
        lang: currentValueLang,
      });
    }
  }

  render() {
    const { toEnglish, toInterslavic, toNovoslovnica } = this.props;
    const { isAuthenticated } = this.props.auth;
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
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
          <NavLink to="/" className="navbar-brand" activeClassName="active">
            <img src="/images/logo.png" alt="SlavDom" height="30px" />
          </NavLink>
        </div>
        <div className="navbar-collapse collapse" id="main-navbar">
          <LeftMenu
            lang={this.state.lang}
          />
          {isAuthenticated
              ? <RightLoggedMenu
                lang={this.state.lang}
                toNovoslovnica={toNovoslovnica}
                toEnglish={toEnglish}
                toInterslavic={toInterslavic}
              />
              : <RightNotLoggedMenu
                lang={this.state.lang}
                toNovoslovnica={toNovoslovnica}
                toEnglish={toEnglish}
                toInterslavic={toInterslavic}
              />}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  lang: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      iat: PropTypes.number,
    }),
  }).isRequired,
  toNovoslovnica: PropTypes.func.isRequired,
  toEnglish: PropTypes.func.isRequired,
  toInterslavic: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {
  toNovoslovnica,
  toEnglish,
  toInterslavic,
})(Navbar);
