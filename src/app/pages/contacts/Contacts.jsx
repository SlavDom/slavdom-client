import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import ContactForm from '../../components/forms/contact-form/ContactForm';

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      $contact: '',
      $theme: '',
      $email: '',
      $message: '',
      $send: '',
    };
  }

  componentDidMount() {
    axios.get(`/api/translations/page?lang=${this.props.lang}&prefix=contact`)
      .then((response) => {
        this.setState({
          $contact: response.data.data.contact,
          $theme: response.data.data.theme,
          $email: response.data.data.email,
          $message: response.data.data.message,
          $send: response.data.data.send,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/page?lang=${nextProps.lang}&prefix=contact`)
        .then((response) => {
          this.setState({
            $contact: response.data.data.contact,
            $theme: response.data.data.theme,
            $email: response.data.data.email,
            $message: response.data.data.message,
            $send: response.data.data.send,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h2>{this.state.$contact}</h2>
        <div className="col-md-4 col-md-offset-4">
          <ContactForm
            email={this.state.$email}
            theme={this.state.$theme}
            message={this.state.$message}
            send={this.state.$send}
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
