import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

export default class LeftMenu extends React.Component {

  render() {
    return (
      <ul className="nav navbar-nav">
        <li><Link to="/faq"><Translate value="faq" /></Link></li>
        <li><Link to="/about"><Translate value="about" /></Link></li>
      </ul>
    );
  }
}
