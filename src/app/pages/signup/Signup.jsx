import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignupForm from '../../components/forms/signup-form/SignupForm';
import { userSignupRequest, isUsernameExists, isEmailExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class Signup extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      lang: props.lang,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { lang } = nextProps;
    const previousValue = this.state.lang;
    const currentValue = lang;
    if (currentValue !== previousValue) {
      this.setState({
        lang: currentValue,
      });
    }
  }

  render() {
    const { userSignupRequest, addFlashMessage, isUsernameExists, isEmailExists } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            push={this.props.history.push}
            userSignupRequest={userSignupRequest}
            addFlashMessage={addFlashMessage}
            isUsernameExists={isUsernameExists}
            isEmailExists={isEmailExists}
            lang={this.state.lang}
          />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUsernameExists: PropTypes.func.isRequired,
  isEmailExists: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  history: PropTypes.shape(PropTypes.func).isRequired,
  push: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(
  mapStateToProps,
  { userSignupRequest, addFlashMessage, isUsernameExists, isEmailExists },
)(Signup);
