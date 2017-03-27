import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
    const previousValue = this.state.lang;
    const currentValue = lang;
    if (currentValue !== previousValue) {
      this.setState({
        lang: currentValue,
      });
    }
  }

  render() {
    const { toEnglish, toInterslavic, toNovoslovnica } = this.props;
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
          {this.props.logged
              ? <RightLoggedMenu />
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
  logged: React.PropTypes.bool,
  lang: React.PropTypes.string.isRequired,
  toNovoslovnica: React.PropTypes.func.isRequired,
  toEnglish: React.PropTypes.func.isRequired,
  toInterslavic: React.PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  logged: false,
};


function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps,
  {
    toNovoslovnica,
    toEnglish,
    toInterslavic,
  })(Navbar);
