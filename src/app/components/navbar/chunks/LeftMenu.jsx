import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class LeftMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      $contact: '',
      $faq: '',
      $about: '',
    };
  }

  componentDidMount() {
    axios.get(`/api/translations/page?lang=${this.props.lang}&prefix=common`)
      .then((response) => {
        this.setState({
          $contact: response.data.data.contact,
          $faq: response.data.data.faq,
          $about: response.data.data.about,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/page?lang=${nextProps.lang}&prefix=common`)
        .then((response) => {
          this.setState({
            $contact: response.data.data.contact,
            $faq: response.data.data.faq,
            $about: response.data.data.about,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <ul className="nav navbar-nav">
        <li><Link to="/contacts">{this.state.$contact}</Link></li>
        <li><Link to="/faq">{this.state.$faq}</Link></li>
        <li><Link to="/about">{this.state.$about}</Link></li>
      </ul>
    );
  }
}

LeftMenu.propTypes = {
  lang: PropTypes.string.isRequired,
};

