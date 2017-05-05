import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { addFlashMessage } from '../actions/flashMessages';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isRedirect: false,
      };
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page',
        });
        this.setState({ isRedirect: true });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.setState({ isRedirect: true });
      }
    }

    render() {
      const redirectDestination = { pathname: '/signin' };
      if (this.state.isRedirect) {
        return (
          <Redirect to={redirectDestination} />
        );
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
