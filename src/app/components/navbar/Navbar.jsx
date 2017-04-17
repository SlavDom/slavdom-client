import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import RightLoggedMenu from './chunks/RightLoggedMenu';
import RightNotLoggedMenu from './chunks/RightNotLoggedMenu';
import LeftMenu from './chunks/LeftMenu';
import { toEnglish, toInterslavic, toNovoslovnica } from '../../actions/languageChoice';
import { logOut } from '../../actions/loginStatus';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
      logged: props.logged,
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

    const { logged } = nextProps;
    const previousValueLogged = this.state.logged;
    const currentValueLogged = logged;
    if (currentValueLogged !== previousValueLogged) {
      this.setState({
        logged: currentValueLogged,
      });
    }
  }

  render() {
    const { toEnglish, toInterslavic, toNovoslovnica, logOut } = this.props;
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
          <Link to="/" className="navbar-brand" activeClassName="active">
            <img src="/images/logo.png" alt="SlavDom" height="30px" />
          </Link>
        </div>
        <div className="navbar-collapse collapse" id="main-navbar">
          <LeftMenu />
          {this.state.logged
              ? <RightLoggedMenu
                lang={this.state.lang}
                logOut={logOut}
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
  logged: React.PropTypes.bool.isRequired,
  logOut: React.PropTypes.func.isRequired,
  lang: React.PropTypes.string.isRequired,
  toNovoslovnica: React.PropTypes.func.isRequired,
  toEnglish: React.PropTypes.func.isRequired,
  toInterslavic: React.PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
    logged: state.loginChanger,
  };
}

export default connect(mapStateToProps,
  {
    toNovoslovnica,
    toEnglish,
    toInterslavic,
    logOut,
  })(Navbar);
