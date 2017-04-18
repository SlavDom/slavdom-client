import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getLang from '../../../utils/languages';

class RightNotLoggedMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      $sign_in: 'Sign in',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(`${nextProps} is here`);
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/package?lang=${nextProps.lang}&code=["sign_in"]`)
        .then((response) => {
          this.setState({
            $sign_in: response.data.data[0],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const style = {
      minWidth: '160px',
    };
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="">Forum</Link></li>
        <li className="dropdown">
          <a
            href=""
            className="dropdown-toggle"
            type="button" id="dropdownMenu1" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="true"
          >
            {getLang(this.props.lang)}
            <span className="caret" />
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li>
              <button className="btn btn-default" style={style} onClick={this.props.toEnglish}>
                English
              </button>
            </li>
            <li>
              <button className="btn btn-default" style={style} onClick={this.props.toNovoslovnica} >
                Новословница
              </button>
            </li>
            <li>
              <button className="btn btn-default" style={style} onClick={this.props.toInterslavic} >
                Interslavic
              </button>
            </li>
          </ul>
        </li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/signin">{this.state.$sign_in}</Link></li>
      </ul>
    );
  }
}

RightNotLoggedMenu.propTypes = {
  lang: PropTypes.string.isRequired,
  toEnglish: PropTypes.func.isRequired,
  toNovoslovnica: PropTypes.func.isRequired,
  toInterslavic: PropTypes.func.isRequired,
};

export default RightNotLoggedMenu;
