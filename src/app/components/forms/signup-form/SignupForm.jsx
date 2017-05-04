import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import axios from 'axios';
import PropTypes from 'prop-types';
import every from 'lodash/every';
import isUndefined from 'lodash/isUndefined';
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
      username_touched: false,
      email_touched: false,
      password_touched: false,
      passwordConfirmation_touched: false,
      timezone_touched: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
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
    this.setState({
      [`${event.target.name}_touched`]: true,
    });
    this.sendRequest(event);
  }

  onSubmit(event) {
    event.preventDefault();
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
      invalid: true,
    }));
  }

  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (field === 'username' && this.state.username_touched) {
      this.props.isUsernameExists(value).then((res) => {
        const errors = this.state.errors;
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
        }
        this.setState({ errors, invalid: !this.isEmpty(errors) });
      });
    } else if (field === 'email' && this.state.email_touched) {
      this.props.isEmailExists(value).then((res) => {
        const errors = this.state.errors;
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
        }
        this.setState({ errors, invalid: !this.isEmpty(errors) });
      });
    }
  }

  sendRequest(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    const errors = signupValidation({
      username: {
        value: this.state.username,
        touched: this.state.username_touched,
      },
      email: {
        value: this.state.email,
        touched: this.state.email_touched,
      },
      password: {
        value: this.state.password,
        touched: this.state.password_touched,
      },
      passwordConfirmation: {
        value: this.state.passwordConfirmation,
        touched: this.state.passwordConfirmation_touched,
      },
      timezone: {
        value: this.state.timezone,
        touched: this.state.timezone_touched,
      },
    }, event.target.name, this.state.errors);
    this.setState({ errors, invalid: !this.isEmpty(errors) });
    this.checkUserExists(event);
  }

  isEmpty() {
    return every(this.state.errors, elem => isUndefined(elem));
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
