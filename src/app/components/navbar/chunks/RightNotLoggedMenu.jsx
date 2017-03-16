import React from 'react';
import { Link } from 'react-router';

class RightNotLoggedMenu extends React.Component {
  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/signin">Sign in</Link></li>
      </ul>
    );
  }
}

export default RightNotLoggedMenu;
