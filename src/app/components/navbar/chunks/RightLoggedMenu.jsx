import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavbarLanguageChooser from './NavbarLanguageChooser';
import './RightMenu.css';

class RightLoggedMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      $sign_out: 'Sign out',
    };
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

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <NavbarLanguageChooser
          toEnglish={this.props.toEnglish}
          toInterslavic={this.props.toInterslavic}
          toNovoslovnica={this.props.toNovoslovnica}
          lang={this.props.lang}
        />
        <li><Link to="">{this.state.$sign_out}</Link></li>
      </ul>
    );
  }
}

RightLoggedMenu.propTypes = {
  lang: PropTypes.string.isRequired,
  toEnglish: PropTypes.func.isRequired,
  toNovoslovnica: PropTypes.func.isRequired,
  toInterslavic: PropTypes.func.isRequired,
};

export default RightLoggedMenu;
