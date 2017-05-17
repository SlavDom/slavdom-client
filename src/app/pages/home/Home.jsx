import React from 'react';
import axios from 'axios';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      newsList: [],
      page: 1,
      length: 5,
      amount: 0,
      $next: '',
      $previous: '',
      $read_more: '',
    };
    this.getNextPage = this.getNextPage.bind(this);
    this.getPrevPage = this.getPrevPage.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/translations/page?lang=${this.props.lang}&prefix=newslist`).then((response) => {
      this.setState({
        $next: response.data.data.next,
        $previous: response.data.data.previous,
        $read_more: response.data.data.read_more,
      });
    });
    axios.get(`/api/news/list?lang=${this.props.lang}&page=${this.state.page}&amount=${this.state.length}`)
      .then((response) => {
        this.setState({
          newsList: response.data.data,
          amount: response.data.amount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      axios.get(`/api/translations/page?lang=${nextProps.lang}&prefix=newslist`).then((response) => {
        this.setState({
          $next: response.data.data.next,
          $previous: response.data.data.previous,
          $read_more: response.data.data.read_more,
        });
      });
      axios.get(`/api/news/list?lang=${nextProps.lang}&page=${this.state.page}&amount=${this.state.length}`)
        .then((response) => {
          this.setState({
            newsList: response.data.data,
            amount: response.data.amount,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getNextPage() {
    axios.get(`/api/news/list?lang=${this.props.lang}&page=${this.state.page + 1}&amount=${this.state.length}`)
      .then((response) => {
        this.setState({
          newsList: response.data.data,
          page: this.state.page + 1,
          amount: response.data.amount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPrevPage() {
    axios.get(`/api/news/list?lang=${this.props.lang}&page=${this.state.page - 1}&amount=${this.state.length}`)
      .then((response) => {
        this.setState({
          newsList: response.data.data,
          page: this.state.page - 1,
          amount: response.data.amount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let newsList = '';
    let prevButton = '';
    let nextButton = '';
    if (this.state.newsList.length === 0) {
      newsList = <div>There is no news yet</div>;
    } else {
      newsList = this.state.newsList.map(item => (
        <div key={shortid.generate()} className="jumbotron">
          <div className="row">
            <div className="col-md-3">
              <Link to="" className="thumbnail">
                <img src="/images/default.png" alt="Something describing news" />
              </Link>
            </div>
            <div className="col-md-9">
              <h2>{item.title}</h2>
              <hr />
              <div><p>{item.shortText}</p></div>
              <Link className="btn btn-primary" to={`/news/${item.theme}`}>{this.state.$read_more}</Link>
            </div>
          </div>
        </div>
      ));
    }
    if (this.state.page > 1) {
      prevButton = (<button className="btn btn-primary" id="prevButton" onClick={this.getPrevPage}>
        {this.state.$previous}
      </button>);
    }
    if (this.state.amount - (this.state.page * this.state.length) > 0) {
      nextButton = (<button className="btn btn-primary" id="nextButton" onClick={this.getNextPage}>
        {this.state.$next}
      </button>);
    }
    return (
      <div>
        {newsList}
        <div className="row">
          <div className="col-md-2">
            {prevButton}
          </div>
          <div className="col-md-offset-10 col-md-2">
            {nextButton}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  lang: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps)(Home);
