import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      $name: 'Name',
      $surname: 'Surname',
      $login: 'Login',
      name: 'Ivan',
      surname: 'Smirnov',
    };
  }

  // Here we should get the information about user
  componentDidMount() {
    // TODO: Here we should get the information about user and translations of name/surname
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      // TODO: Here we should change the translations
    }
  }

  render() {
    const login = this.props.match.params.login === 'me' ? 'It\'s your login' : this.props.match.params.login;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1>Profile page</h1>
          <p><b>{this.state.$login}</b> {login}</p>
          <p><b>{this.state.$name}</b> {this.state.name}</p>
          <p><b>{this.state.$surname}</b> {this.state.surname}</p>
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
  match: {},
  params: {},
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps)(Profile);
