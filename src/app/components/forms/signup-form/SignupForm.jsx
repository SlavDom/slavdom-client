import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';

import TextFieldGroup from '../../common/TextFieldGroup';
import timezones from '../../../utils/timezones';
import validateInput from '../../../../../../server/shared/validations/signup';

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
    if (this.isValid()) {
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
        <h1>Join our community!</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
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
          <button className="btn btn-primary btn-lg" disabled={this.state.isLoading}>Sign up</button>
        </div>

      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};
