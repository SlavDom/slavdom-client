import React from 'react';
import { Translate } from 'react-redux-i18n';

class About extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div>
          <h3><Translate value="about_us" /></h3>
          <p><Translate value="about_us" /></p>
          <h3><Translate value="contact_us" /></h3>
          <p><Translate value="our_email" />: <a href="mailto:test.slavdom@yandex.ru">test.slavdom@yandex.ru</a></p>
        </div>
      </div>
    );
  }
}

export default About;
