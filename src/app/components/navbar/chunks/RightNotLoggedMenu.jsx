import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RightMenu.css';
import getLang from '../../../utils/languages';

class RightNotLoggedMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      $sign_in: '',
      $sign_up: '',
    };
  }

  componentDidMount() {
    axios.get(`/api/translations/page?lang=${this.props.lang}&prefix=common`)
      .then((response) => {
        this.setState({
          $sign_in: response.data.data.sign_in,
          $sign_up: response.data.data.sign_up,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log(`${nextProps} is here`);
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/page?lang=${nextProps.lang}&prefix=common`)
        .then((response) => {
          this.setState({
            $sign_in: response.data.data.sign_in,
            $sign_up: response.data.data.sign_up,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getClass(name) {
    if (name === this.props.lang) {
      return 'activeA';
    }
    return 'inactiveA';
  }

  render() {
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
            <li className="navbarLanguageChooseLi">
              <div className="row">
                <div className="col-md-1 col-md-offset-1">
                  <img width="30px" src="/images/en_flag.svg" alt="English flag" />
                </div>
                <div className="col-md-8 col-md-offset-1">
                  <a tabIndex="-1" className={this.getClass('en')} onClick={this.props.toEnglish}>
                    English
                  </a>
                </div>
              </div>
            </li>
            <li className="navbarLanguageChooseLi">
              <div className="row">
                <div className="col-md-1 col-md-offset-1">
                  <img width="30px" src="/images/nsl_flag.svg" alt="Novoslovnica flag" />
                </div>
                <div className="col-md-8 col-md-offset-1">
                  <a tabIndex="-1" className={this.getClass('nsl')} onClick={this.props.toNovoslovnica} >
                    Новословница
                  </a>
                </div>
              </div>
            </li>
            <li className="navbarLanguageChooseLi">
              <div className="row">
                <div className="col-md-1 col-md-offset-1">
                  <img width="30px" src="/images/is_flag.svg" alt="Interslavic flag" />
                </div>
                <div className="col-md-8 col-md-offset-1">
                  <a tabIndex="-1" className={this.getClass('is')} onClick={this.props.toInterslavic} >
                      Interslavic
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li><Link to="/signup">{this.state.$sign_up}</Link></li>
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
