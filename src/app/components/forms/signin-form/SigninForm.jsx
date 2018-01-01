import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

import '../Forms.css';
import TextFieldGroup from '../../common/TextFieldGroup';
import signinValidation from '../../../../shared/signin';

export default class SigninForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
      isRedirect: false,
      lang: props.lang,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state)
        .then(() => this.setState({ isRedirect: true }))
        .catch(err => this.setState({ errors: err.response.data.errors, isLoading: false }));
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  isValid() {
    const { errors, isValid } = signinValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors, isRedirect } = this.state;
    const redirectDestination = { pathname: '/' };

    if (isRedirect) {
      return (
        <Redirect to={redirectDestination} />
      );
    }

    return (
      <div>
        <h2>{this.state.$sign_in}</h2>
        <form onSubmit={this.onSubmit}>
          <h1><Translate value="join_us" /></h1>

          { errors.form && <div className="alert alert-danger">{ errors.form }</div> }

          <TextFieldGroup
            field="identifier"
            label="username/email"
            value={this.state.identifier}
            error={errors.identifier}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="password"
            label="password"
            value={this.state.password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
          />

          <div className="form-group">
            <button
              className="btn btn-primary btn-lg"
              disabled={this.state.isLoading}
            ><Translate value="sign_in" /></button>
          </div>
        </form>
      </div>
    );
  }
}

SigninForm.propTypes = {
  lang: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};
