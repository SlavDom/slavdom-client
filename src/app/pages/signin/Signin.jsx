import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SigninForm from '../../components/forms/signin-form/SigninForm';
import { addFlashMessage } from '../../actions/flashMessages';
import { logIn } from '../../actions/loginStatus';

class Signin extends React.Component {

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
    const { addFlashMessage, logIn } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SigninForm
            addFlashMessage={addFlashMessage}
            lang={this.state.lang}
            logIn={logIn}
          />
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  logIn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps, {
  addFlashMessage,
  logIn,
})(Signin);
