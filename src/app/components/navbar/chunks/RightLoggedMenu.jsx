import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './RightMenu.css';
import NavbarLanguageChooser from './NavbarLanguageChooser';
import { logout } from '../../../actions/authActions';

class RightLoggedMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      $sign_out: 'Sign out',
    };
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <NavbarLanguageChooser
          toEnglish={this.props.toEnglish}
          toInterslavic={this.props.toInterslavic}
          toNovoslovnica={this.props.toNovoslovnica}
          lang={this.props.lang}
        />
        <li><Link onClick={this.logout} to="">{this.state.$sign_out}</Link></li>
      </ul>
    );
  }
}

RightLoggedMenu.propTypes = {
  lang: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  toEnglish: PropTypes.func.isRequired,
  toNovoslovnica: PropTypes.func.isRequired,
  toInterslavic: PropTypes.func.isRequired,
};

export default connect(null, { logout })(RightLoggedMenu);
