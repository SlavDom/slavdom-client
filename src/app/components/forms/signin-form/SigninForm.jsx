import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
      $username: '',
      $password: '',
      $email: '',
      $sign_in: 'Sign in',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/translations/page?lang=${this.state.lang}&prefix=reg`)
      .then((response) => {
        this.setState({
          $username: response.data.data.username,
          $password: response.data.data.password,
          $email: response.data.data.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { lang } = nextProps;
    const previousValue = this.state.lang;
    const currentValue = lang;
    if (currentValue !== previousValue) {
      axios.get(`/api/translations/page?lang=${currentValue}&prefix=reg`)
        .then((response) => {
          this.setState({
            $username: response.data.data.username,
            $password: response.data.data.password,
            lang: currentValue,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          <h1>{this.state.$join_us}</h1>

          { errors.form && <div className="alert alert-danger">{ errors.form }</div> }

          <TextFieldGroup
            field="identifier"
            label={`${this.state.$username} / ${this.state.$email}`}
            value={this.state.identifier}
            error={errors.identifier}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="password"
            label={this.state.$password}
            value={this.state.password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
          />

          <div className="form-group">
            <button
              className="btn btn-primary btn-lg"
              disabled={this.state.isLoading}
            >{this.state.$sign_in}</button>
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
