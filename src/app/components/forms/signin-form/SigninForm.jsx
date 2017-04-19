import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TextFieldGroup from '../../common/TextFieldGroup';

export default class SigninForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {},
      lang: props.lang,
      $username: '',
      $password: '',
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
    this.props.logIn();
    event.preventDefault();
    axios.post('/api/users/login', {
      username: this.state.username,
      password: this.state.password,
    }).then((response) => {
      if (response) {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You signed in successfully. Welcome!',
        });
      } else {
        this.props.addFlashMessage({
          type: 'failure',
          text: 'You have not signed in. Try again!',
        });
      }
    },
    ).catch(error => this.setState({
      errors: error.response.data,
    }));
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h2>
          { this.state.$sign_in }
        </h2>
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
            error={errors.password}
            label={this.state.$password}
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            type="password"
          />

          <div className="form-group">
            <button
              className="btn btn-primary btn-lg"
              disabled={this.state.isLoading || this.state.invalid}
            >{this.state.$sign_in}</button>
          </div>
        </form>
      </div>
    );
  }
}

SigninForm.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  logIn: PropTypes.func.isRequired,
};
