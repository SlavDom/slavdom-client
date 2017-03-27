import React from 'react';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';

class FlashMessagesList extends React.Component {
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />);
    return (
      <div>{messages}</div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  deleteFlashMessage: React.PropTypes.func,
};

FlashMessagesList.defaultProps = {
  messages: [],
  deleteFlashMessage: () => {},
};

function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
  };
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);