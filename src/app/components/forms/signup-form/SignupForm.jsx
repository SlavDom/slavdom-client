import React from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import classnames from 'classnames';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import TextFieldGroup from '../../common/TextFieldGroup';
import timezones from '../../../utils/timezones';
import signupValidation from '../../../../../../build/server/shared/signup';

export default class SignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      usernameTouched: false,
      emailTouched: false,
      passwordTouched: false,
      passwordConfirmationTouched: false,
      timezoneTouched: false,
      errors: {
        username: undefined,
        email: undefined,
        password: undefined,
        passwordConfirmation: undefined,
        timezone: undefined,
      },
      isLoading: false,
      invalid: false,
      isRedirect: false,
      lang: props.lang,
      $email: '',
      $username: '',
      $password: '',
      $password_confirmation: '',
      $join_us: '',
      $sign_up: 'Sign up',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/translations/page?lang=${this.state.lang}&prefix=reg`)
      .then((response) => {
        this.setState({
          $email: response.data.data.email,
          $username: response.data.data.username,
          $password: response.data.data.password,
          $password_confirmation: response.data.data.password_confirmation,
          $join_us: response.data.data.join_us,
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
            $email: response.data.data.email,
            $username: response.data.data.username,
            $password: response.data.data.password,
            $password_confirmation: response.data.data.password_confirmation,
            $join_us: response.data.data.join_us,
            lang: currentValue,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChange(event) {
    this.sendRequest(event);
  }

  onBlur(event) {
    event.persist();
    this.setState({
      [`${event.target.name}Touched`]: true,
    }, () => this.sendRequest(event));
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      isLoading: true,
    });
    const requestPayload = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
      timezone: this.state.timezone,
    };
    this.props.userSignupRequest(requestPayload).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You signed up successfully. Welcome!',
        });
        this.setState({ isLoading: false, isRedirect: true });
      },
    ).catch(error => this.setState({
      errors: error.response.data,
      isLoading: false,
      invalid: true,
    }));
  }

  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (field === 'username' && this.state.usernameTouched) {
      this.props.isUsernameExists(value).then((res) => {
        const errors = this.state.errors;
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
        }
        this.setState({ errors, invalid: !isEmpty(errors) });
      });
    } else if (field === 'email' && this.state.emailTouched) {
      this.props.isEmailExists(value).then((res) => {
        const errors = this.state.errors;
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
        }
        this.setState({ errors, invalid: !isEmpty(errors) });
      });
    }
  }

  sendRequest(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    const dataRequestPayload = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
      timezone: this.state.timezone,
    };
    const touchedRequestPayload = {
      usernameTouched: this.state.usernameTouched,
      emailTouched: this.state.emailTouched,
      passwordTouched: this.state.passwordTouched,
      passwordConfirmationTouched: this.state.passwordConfirmationTouched,
      timezoneTouched: this.state.timezoneTouched,
    };
    const { errors, isValid } = signupValidation(dataRequestPayload, touchedRequestPayload);
    this.setState({ errors, invalid: !isValid });
    this.checkUserExists(event);
  }

  render() {
    const redirectDestination = { pathname: '/' };
    const { errors, isRedirect } = this.state;
    const timezoneOptions = map(timezones, (value, key) => <option key={value} value={value}>{key}</option>);

    if (isRedirect) {
      return (
        <Redirect to={redirectDestination} />
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
        <h1>{this.state.$join_us}</h1>

        <TextFieldGroup
          error={errors.username}
          label={this.state.$username}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label={this.state.$email}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label={this.state.$password}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label={this.state.$password_confirmation}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className={classnames('form-group', { 'has-error': errors.timezone })}>
          <label className="control-label" htmlFor="signup_timezone">Timezone</label>
          <select
            id="signup_timezone"
            value={this.state.timezone}
            onChange={this.onChange}
            onBlur={this.onBlur}
            type="text"
            name="timezone"
            className="form-control"
          >
            <option value="" disabled>Pick your timezone</option>
            {timezoneOptions}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-lg"
            disabled={this.state.isLoading || this.state.invalid}
          >{this.state.$sign_up}</button>
        </div>

      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  isEmailExists: PropTypes.func.isRequired,
  isUsernameExists: PropTypes.func.isRequired,
};
