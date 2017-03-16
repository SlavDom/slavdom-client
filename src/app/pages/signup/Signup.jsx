import React from 'react';
import { connect } from 'react-redux';

import SignupForm from '../../components/forms/signup-form/SignupForm';
import userSignupRequest from '../../actions/signupActions';

class Signup extends React.Component {
  render() {
    // eslint-disable-next-line no-shadow
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest })(Signup);
