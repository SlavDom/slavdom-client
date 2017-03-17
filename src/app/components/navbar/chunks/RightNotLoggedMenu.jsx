import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class RightNotLoggedMenu extends React.Component {

  static getLang(e) {
    let res = '';
    switch (e) {
      case 'en': res = 'English';
        break;
      case 'nsl': res = 'Новословница';
        break;
      case 'is': res = 'Interslavic';
        break;
      default: break;
    }
    return res;
  }

  constructor() {
    super();
    this.state = {
      sign_in: '',
    };
  }

  componentDidMount() {
    axios.get(`/api/translations/package?lang=${this.props.lang}&code=["sign_in"]`)
          .then((response) => {
            this.setState({
              sign_in: response.data.data[0],
            });
          })
          .catch((error) => {
            console.log(error);
          });
  }

  shouldComponentUpdate(nextProps, nextStates) {
    return this.props.lang !== nextProps.lang || this.state.sign_in !== nextStates.sign_in;
  }

  componentWillUpdate(nextProps) {
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

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a
            href=""
            className="dropdown-toggle"
            type="button" id="dropdownMenu1" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="true"
          >{this.props.lang ? <b>{RightNotLoggedMenu.getLang(this.props.lang)}</b> : null} <span className="caret" /></a
         >
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><Link onClick={() => this.props.handlerLang('en')}>English</Link></li>
            <li><Link onClick={() => this.props.handlerLang('nsl')}>Новословница</Link></li>
            <li><Link onClick={() => this.props.handlerLang('is')}>Interslavic</Link></li>
          </ul>
        </li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/signin">{this.state.sign_in ? <b>{this.state.sign_in}</b> : null}</Link></li>
      </ul>
    );
  }
}

RightNotLoggedMenu.propTypes = {
  lang: React.PropTypes.string,
  handlerLang: React.PropTypes.func,
};

RightNotLoggedMenu.defaultProps = {
  lang: '',
  handlerLang: () => {},
};

export default RightNotLoggedMenu;
