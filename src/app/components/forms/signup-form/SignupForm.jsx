import React from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
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
      errors: {},
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
    this.setState({
      [event.target.name]: event.target.value,
      invalid: false,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true,
      });
      this.props.userSignupRequest(this.state).then(
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
      }));
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (value !== '') {
      if (field === 'username') {
        this.props.isUsernameExists(value).then((res) => {
          const errors = this.state.errors;
          if (res.data.user) {
            errors[field] = `There is user with such ${field}`;
          } else {
            delete errors[field];
          }
          this.setState({ errors, invalid: !isEmpty(errors) });
        });
      } else if (field === 'email') {
        this.props.isEmailExists(value).then((res) => {
          const errors = this.state.errors;
          if (res.data.user) {
            errors[field] = `There is user with such ${field}`;
          } else {
            delete errors[field];
          }
          this.setState({ errors, invalid: !isEmpty(errors) });
        });
      }
    } else {
      const errors = this.state.errors;
      errors[field] = '';
      this.setState({ errors, invalid: !isEmpty(errors) });
    }
  }

  isValid() {
    const { errors, isValid } = signupValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
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
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label={this.state.$email}
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label={this.state.$password}
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label={this.state.$password_confirmation}
          onChange={this.onChange}
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
  isUsernameExists: PropTypes.func.isRequired,
  isEmailExists: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};
