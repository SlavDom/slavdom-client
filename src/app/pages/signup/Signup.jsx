import React from 'react';
import SignupForm from '../../components/forms/signup-form/SignupForm';

export default class Signup extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm />
        </div>
      </div>
    );
  }
}