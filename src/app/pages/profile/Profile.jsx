import React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import findValue from '../../utils/findValue';

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      $name: 'Name',
      $surname: 'Surname',
      $login: 'Login',
      name: 'Ivan',
      surname: 'Smirnov',
      user: {},
    };
  }

  // Here we should get the information about user
  componentWillMount() {
    axios.get(`/api/users/get?login=${this.props.match.params.login}
&username=${jwtDecode(localStorage.jwtToken).username}`)
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // TODO: Here we should get the information about user and translations of name/surname
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      // TODO: Here we should change the translations
    }
  }

  render() {
    const login = this.props.match.params.login === 'me' ?
      `It's your login: ${this.state.user.username}` :
      this.props.match.params.login;
    const name = findValue('name', this.state.user);
    const surname = findValue('surname', this.state.user);
    const email = findValue('email', this.state.user);
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1>Profile page</h1>
          <p><b><Translate value="login" /></b> {login}</p>
          <p><b><Translate value="name" /></b> {name}</p>
          <p><b><Translate value="surname" /></b> {surname}</p>
          <p><b><Translate value="email" /></b>: {email}</p>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  lang: PropTypes.string.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)),
  params: PropTypes.shape(PropTypes.string),
};

Profile.defaultProps = {
  match: {
    params: {},
  },
  params: {},
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps)(Profile);
