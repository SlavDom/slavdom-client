import React from 'react';
import { getLocale, setLocale } from 'react-redux-i18n';

import getLang from '../../../utils/languages';

export default class NavbarLanguageChooser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: getLang(getLocale),
    };
  }

  getClass(name) {
    if (name === this.state.lang) {
      return 'activeA';
    }
    return 'inactiveA';
  }

  render() {
    return (<li className="dropdown">
      <a
        href=""
        className="dropdown-toggle"
        type="button"
        id="dropdownMenu1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {this.state.lang}
        <span className="caret" />
      </a>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li className="navbarLanguageChooseLi">
          <div className="row">
            <div className="col-md-1 col-md-offset-1">
              <img width="30px" src="/images/en_flag.svg" alt="English flag" />
            </div>
            <div className="col-md-8 col-md-offset-1">
              <a role="button" tabIndex="-1" className={this.getClass('en')} onClick={() => setLocale('en')}>
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
              <a role="button" tabIndex="-1" className={this.getClass('nsl')} onClick={() => setLocale('nsl')} >
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
              <a role="button" tabIndex="-1" className={this.getClass('is')} onClick={() => setLocale('is')} >
                Interslavic
              </a>
            </div>
          </div>
        </li>
      </ul>
    </li>);
  }
}
