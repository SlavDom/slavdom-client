import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getLang from '../../../utils/languages';
import './RightMenu.css';

class RightLoggedMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      $sign_out: 'Sign out',
    };
    this.logOut = this.logOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/package?lang=${nextProps.lang}&code=["sign_in"]`)
        .then((response) => {
          this.setState({
            sign_in: response.data.data[0],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getClass(name) {
    if (name === this.props.lang) {
      return 'btn btn-primary';
    }
    return 'btn btn-default';
  }

  logOut() {
    this.props.logOut();
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
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
              <button className={this.getClass('en')} onClick={this.props.toEnglish}>
                <div className="row">
                  <div className="col-md-2">
                    <img width="30px" src="/images/en_flag.svg" alt="English flag" />
                  </div>
                  <div className="col-md-8">
                    English
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button className={this.getClass('nsl')} onClick={this.props.toNovoslovnica} >
                <div className="row">
                  <div className="col-md-2">
                    <img width="30px" src="/images/nsl_flag.svg" alt="Novoslovnica flag" />
                  </div>
                  <div className="col-md-8">
                    Новословница
                  </div>
                </div>
              </button>
            </li>
            <li>
              <button className={this.getClass('is')} onClick={this.props.toInterslavic} >
                <div className="row">
                  <div className="col-md-2">
                    <img width="30px" src="/images/is_flag.svg" alt="Interslavic flag" />
                  </div>
                  <div className="col-md-8">
                    Interslavic
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </li>
        <li><Link onClick={this.logOut} to="">{this.state.$sign_out}</Link></li>
      </ul>
    );
  }
}

RightLoggedMenu.propTypes = {
  lang: PropTypes.string.isRequired,
  toEnglish: PropTypes.func.isRequired,
  toNovoslovnica: PropTypes.func.isRequired,
  toInterslavic: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default RightLoggedMenu;
