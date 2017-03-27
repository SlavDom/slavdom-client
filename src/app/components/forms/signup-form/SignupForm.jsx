import React from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import axios from 'axios';

import TextFieldGroup from '../../common/TextFieldGroup';
import timezones from '../../../utils/timezones';
import validateInput from '../../../validations/signup';

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
      lang: 'en',
      $email: '',
      $username: '',
      $password: '',
      $password_confirmation: '',
      $join_us: '',
      $sign_up: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/translations/package?lang=${this.state.lang}&code=[
"reg$email","reg$username","reg$password","reg$password_confirmation","reg$join_us","sign_up"]`)
      .then((response) => {
        this.setState({
          $email: response.data.data[0],
          $username: response.data.data[1],
          $password: response.data.data[2],
          $password_confirmation: response.data.data[3],
          $join_us: response.data.data[4],
          $sign_up: response.data.data[5],
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
      axios.get(`/api/translations/package?lang=${currentValue}&code=[
"reg$email","reg$username","reg$password","reg$password_confirmation","reg$join_us","sign_up"]`)
        .then((response) => {
          this.setState({
            $email: response.data.data[0],
            $username: response.data.data[1],
            $password: response.data.data[2],
            $password_confirmation: response.data.data[3],
            $join_us: response.data.data[4],
            $sign_up: response.data.data[5],
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
          this.setState({ isLoading: false });
          browserHistory.push('/');
        },
      ).catch(error => this.setState({
        errors: error.response.data,
        isLoading: false,
      }));
    }
  }

  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (value !== '') {
      this.props.isUserExists(value).then((res) => {
        const errors = this.state.errors;
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
        } else {
          delete errors[field];
        }
        this.setState({ errors, invalid: !isEmpty(errors) });
      });
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors } = this.state;
    const timezoneOptions = map(timezones, (value, key) => <option key={value} value={value}>{key}</option>);

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
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
  lang: React.PropTypes.string.isRequired,
};
