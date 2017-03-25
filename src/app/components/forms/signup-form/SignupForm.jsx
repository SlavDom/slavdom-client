import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';

import timezones from '../../../utils/timezones';

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
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      isLoading: true,
    });
    this.props.userSignupRequest(this.state).then(
      () => {
        this.setState({ isLoading: false });
      },
    ).catch(error => this.setState({
      errors: error.response.data,
      isLoading: false,
    }));
  }

  render() {
    const { errors } = this.state;
    const timezoneOptions = map(timezones, (value, key) => <option key={value} value={value}>{key}</option>);

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <div className={classnames('form-group', { 'has-error': errors.username })}>
          <label className="control-label" htmlFor="signup_username">Username</label>
          <input
            id="signup_username"
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="form-control"
          />
          {errors.username && <span className="help-block">{errors.username}</span>}
        </div>

        <div className={classnames('form-group', { 'has-error': errors.email })}>
          <label className="control-label" htmlFor="signup_email">Email</label>
          <input
            id="signup_email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
            className="form-control"
          />
          {errors.email && <span className="help-block">{errors.email}</span>}
        </div>

        <div className={classnames('form-group', { 'has-error': errors.password })}>
          <label className="control-label" htmlFor="signup_password">Password</label>
          <input
            id="signup_password"
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
          />
          {errors.password && <span className="help-block">{errors.password}</span>}
        </div>

        <div className={classnames('form-group', { 'has-error': errors.passwordConfirmation })}>
          <label className="control-label" htmlFor="signup_password_confirmation">Password Confirmation</label>
          <input
            id="signup_password_confirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
          {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
        </div>

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
          <button className="btn btn-primary btn-lg" disabled={this.state.isLoading}>Sign up</button>
        </div>

      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};
