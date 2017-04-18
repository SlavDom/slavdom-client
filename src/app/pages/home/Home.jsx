import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      newsList: [],
      lang: props.lang,
      page: 1,
      length: 5,
      amount: 0,
    };
    this.getNextPage = this.getNextPage.bind(this);
    this.getPrevPage = this.getPrevPage.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/news/list?lang=${this.state.lang}&page=${this.state.page}&amount=${this.state.length}`)
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
    const { lang } = nextProps;
    const previousValue = this.state.lang;
    const currentValue = lang;
    if (currentValue !== previousValue) {
      axios.get(`/api/news/list?lang=${currentValue}&page=${this.state.page}&amount=${this.state.length}`)
        .then((response) => {
          this.setState({
            newsList: response.data.data,
            lang: currentValue,
            amount: response.data.amount,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getNextPage() {
    axios.get(`/api/news/list?lang=${this.state.lang}&page=${this.state.page + 1}&amount=${this.state.length}`)
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
    axios.get(`/api/news/list?lang=${this.state.lang}&page=${this.state.page - 1}&amount=${this.state.length}`)
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
      newsList = this.state.newsList.map(item =>
        <div className="jumbotron">
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
              <Link className="btn btn-primary" to={`/news/${item.theme}`}>Read more</Link>
            </div>
          </div>
        </div>);
    }
    if (this.state.page > 1) {
      prevButton = (<button className="btn btn-primary" id="prevButton" onClick={this.getPrevPage}>
          Previous
        </button>);
    }
    if (this.state.amount - (this.state.page * this.state.length) > 0) {
      nextButton = (<button className="btn btn-primary" id="nextButton" onClick={this.getNextPage}>
          Next
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
