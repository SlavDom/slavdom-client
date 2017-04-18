import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContactForm from '../../components/forms/contact-form/ContactForm';

class Contacts extends React.Component {

  constructor() {
    super();
    this.title = 'Contacts';
  }

  render() {
    return (
      <div className="container-fluid">
        <h2>{this.title}</h2>
        <div>
          <ContactForm
            lang={this.props.lang}
          />
        </div>
      </div>
    );
  }
}

Contacts.propTypes = {
  lang: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps)(Contacts);
