import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TextFieldGroup from '../../common/TextFieldGroup';

export default class ContactForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      theme: '',
      message: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  onSubmit(event) {
    event.preventDefault();
    axios.post('/api/common/mail', {
      from: this.state.email,
      theme: this.state.theme,
      message: this.state.message,
    }).then(
      console.log('Mail is sent!'),
    );
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>

        <TextFieldGroup
          label={this.props.email}
          onChange={this.onChange}
          value={this.state.email}
          field="email"
          type="email"
        />

        <TextFieldGroup
          label={this.props.theme}
          onChange={this.onChange}
          value={this.state.theme}
          field="theme"
        />

        <div className="form-group">
          <label className="control-label" htmlFor="contact message">{this.props.message}</label>
          <textarea
            id="contact_message"
            value={this.state.message}
            onChange={this.onChange}
            name="message"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-lg"
          >{this.props.send}</button>
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
};
