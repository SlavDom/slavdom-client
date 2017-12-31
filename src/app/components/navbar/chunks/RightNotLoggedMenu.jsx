import React from 'react';
import { Link } from 'react-router-dom';

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

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="">Forum</Link></li>
        <NavbarLanguageChooser />
        <li><Link to="/signup">{this.state.$sign_up}</Link></li>
        <li><Link to="/signin">{this.state.$sign_in}</Link></li>
      </ul>
    );
  }
}

export default RightNotLoggedMenu;
