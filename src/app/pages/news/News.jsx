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
      $commentaries: '',
      $author: '',
      $category: '',
    };
  }

  componentDidMount() {
    axios.get(`/api/dispatch/news_translations?lang=${this.props.lang}
&prefix=news&theme=${this.props.match.params.theme}`)
      .then((response) => {
        console.log(response);
        this.setState({
          $commentaries: response.data.translations.commentary_pl,
          $author: response.data.translations.author,
          $category: response.data.translations.category,
          news: response.data.news,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/dispatch/news_translations?lang=${nextProps.lang}
&prefix=news&theme=${this.props.match.params.theme}`)
        .then((response) => {
          console.log(response);
          this.setState({
            $commentaries: response.data.translations.commentary_pl,
            $author: response.data.translations.author,
            $category: response.data.translations.category,
            news: response.data.news,
          });
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
                {this.state.$category}:
              </li>
              <li>
                Date: {this.state.news.createdAt}
              </li>
              <li>
                {this.state.$author}: someone
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
              {this.state.$commentaries}
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
