import React from 'react';
import PropTypes from 'prop-types';

import './Commentary.css';

export default class Commentary extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      commentary: props.commentary,
    };
  }

  render() {
    return (
      <div className="media">
        <div className="media-left">
          <b>Rate:</b> {this.state.commentary.rating}
        </div>
        <div className="media-body">
          <h5 className="media-heading">Somebody</h5>
          <div className="rightHand">
            <i>Date: {this.state.commentary.leaveDate}</i>
          </div>
          <b>Text:</b>
          <br />
          {this.state.commentary.text}
        </div>
      </div>
    );
  }
}

Commentary.propTypes = {
  commentary: PropTypes.shape(PropTypes.string).isRequired,
};
