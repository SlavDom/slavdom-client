import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RightMenu.css';
import NavbarLanguageChooser from './NavbarLanguageChooser';

class RightNotLoggedMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      $sign_in: '',
      $sign_up: '',
    };
  }

  componentDidMount() {
    axios.get(`/api/translations/page?lang=${this.props.lang}&prefix=common`)
      .then((response) => {
        this.setState({
          $sign_in: response.data.data.sign_in,
          $sign_up: response.data.data.sign_up,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/page?lang=${nextProps.lang}&prefix=common`)
        .then((response) => {
          this.setState({
            $sign_in: response.data.data.sign_in,
            $sign_up: response.data.data.sign_up,
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
        <li><Link to="">Forum</Link></li>
        <NavbarLanguageChooser
          toEnglish={this.props.toEnglish}
          toInterslavic={this.props.toInterslavic}
          toNovoslovnica={this.props.toNovoslovnica}
          lang={this.props.lang}
        />
        <li><Link to="/signup">{this.state.$sign_up}</Link></li>
        <li><Link to="/signin">{this.state.$sign_in}</Link></li>
      </ul>
    );
  }
}

RightNotLoggedMenu.propTypes = {
  lang: PropTypes.string.isRequired,
  toEnglish: PropTypes.func.isRequired,
  toNovoslovnica: PropTypes.func.isRequired,
  toInterslavic: PropTypes.func.isRequired,
};

export default RightNotLoggedMenu;
