import React from 'react';
import axios from 'axios';
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
      $log_out: 'Logout',
    };
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/package?lang=${nextProps.lang}&code=["sign_in"]`)
        .then((response) => {
          this.setState({
            sign_in: response.data.data[0],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        <li><Link onClick={this.logout} to="">{this.state.$log_out}</Link></li>
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
