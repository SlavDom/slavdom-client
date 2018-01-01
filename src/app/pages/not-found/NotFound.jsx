import React from 'react';
import { Translate } from 'react-redux-i18n';

class NotFound extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h3>404 page not found</h3>
        <p><Translate value="page_not_exist" /></p>
      </div>
    );
  }
}

export default NotFound;
