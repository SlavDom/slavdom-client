import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './News.css';

class News extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      news: null,
      lang: props.lang,
    };
  }

  componentDidMount() {
    axios.get(`/api/news/get?lang=${this.state.lang}&theme=${this.props.match.params.theme}`)
      .then((response) => {
        this.setState({
          news: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { lang } = nextProps;
    const previousValue = this.state.lang;
    const currentValue = lang;
    if (currentValue !== previousValue) {
      axios.get(`/api/news/get?lang=${currentValue}&theme=${this.props.match.params.theme}`)
        .then((response) => {
          if (response !== null) {
            this.setState({
              news: response.data.data,
              lang: currentValue,
            });
          } else {
            this.setState({
              news: null,
              lang: currentValue,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    let newsPage = null;
    let newsCommentaries = null;
    if (this.state.news !== null) {
      if (this.state.news.commentaries.length > 0) {
        newsCommentaries = (<div>
          There is some commentaries on this news.
        </div>);
      } else {
        newsCommentaries = (<div>
          There is no commentaries on this news yet.
        </div>);
      }
      newsPage = (<div id="newsPage" className="col-md-offset-1 col-md-6">
        <h2>{this.state.news.title}</h2>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <img src="/images/default.png" width="100%" alt="Something describing news" />
          </div>
          <div className="col-md-6">
            <ul>
              <li>
                Category:
              </li>
              <li>
                Date: {this.state.news.createdAt}
              </li>
              <li>
                Author:
              </li>
              <li>
                Views:
              </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="row">
          <p className="newsText">
            {this.state.news.fullText}
          </p>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-offset-1 col-md-5">
            <h4>
              Commentaries
            </h4>
            {newsCommentaries}
          </div>
        </div>
        <br />
      </div>);
    } else {
      newsPage = (<div className="row">
          There is no translation for this news yet.
        </div>);
    }
    return (<div className="row">{newsPage}</div>);
  }
}

News.propTypes = {
  lang: PropTypes.string.isRequired,
  match: PropTypes.shape(PropTypes.shape(PropTypes.string)),
  params: PropTypes.shape(PropTypes.string),
};

News.defaultProps = {
  match: {},
  params: {},
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps)(News);
