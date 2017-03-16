import React from 'react';
import map from 'lodash/map';
import axios from 'axios';

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
    axios.post('/api/users', {
      user: this.state,
    });
  }

  render() {
    const timezoneOptions = map(timezones, (value, key) => <option key={value} value={value}>{key}</option>);

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <div className="form-group">
          <label className="control-label" htmlFor="signup_username">Username</label>
          <input
            id="signup_username"
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="signup_email">Email</label>
          <input
            id="signup_email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="signup_password">Password</label>
          <input
            id="signup_password"
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="signup_password_confirmation">Password Confirmation</label>
          <input
            id="signup_password_confirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
        </div>

        <div className="form-group">
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
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg">Sign up</button>
        </div>

      </form>
    );
  }
}
