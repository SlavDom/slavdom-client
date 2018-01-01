import React from 'react';
import PropTypes from 'prop-types';
import { setLocale } from 'react-redux-i18n';
import { connect } from 'react-redux';

import getLang from '../../../utils/languages';

class NavbarLanguageChooser extends React.Component {

  getClass(name) {
    if (name === this.props.getLocale) {
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
        {getLang(this.props.getLocale)}
        <span className="caret" />
      </a>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li className="navbarLanguageChooseLi">
          <div className="row">
            <div className="col-md-1 col-md-offset-1">
              <img width="30px" src="/images/en_flag.svg" alt="English flag" />
            </div>
            <div className="col-md-8 col-md-offset-1">
              <a
                role="button"
                tabIndex="-1"
                className={this.getClass('en')}
                onClick={() => this.props.setLocale('en')}
              >
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
              <a
                role="button"
                tabIndex="-1"
                className={this.getClass('nsl')}
                onClick={() => this.props.setLocale('nsl')}
              >
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
              <a
                role="button"
                tabIndex="-1"
                className={this.getClass('is')}
                onClick={() => this.props.setLocale('is')}
              >
                Interslavic
              </a>
            </div>
          </div>
        </li>
      </ul>
    </li>);
  }
}

NavbarLanguageChooser.propTypes = {
  getLocale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  getLocale: state.i18n.locale,
});

export default connect(mapStateToProps, {
  setLocale,
})(NavbarLanguageChooser);
