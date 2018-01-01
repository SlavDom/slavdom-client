import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
    };
  }

  render() {
    return (
      <footer>
        <div>
          <div className="col-md-3">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/about">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <br />
            <p>SlavDom, inc. (c) Slavic Team 2017</p>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  lang: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps, {})(Footer);
