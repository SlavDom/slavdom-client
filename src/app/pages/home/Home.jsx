import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './Home.css';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      newsList: [],
      lang: props.lang,
    };
  }

  componentDidMount() {
    axios.get(`/api/news/list?lang=${this.state.lang}`)
      .then((response) => {
        this.setState({
          newsList: response.data.data,
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
      axios.get(`/api/news/list?lang=${currentValue}`)
        .then((response) => {
          this.setState({
            newsList: response.data.data,
            lang: currentValue,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    console.log(this.state.newsList);
    let newsList = '';
    if (this.state.newsList.length === 0) {
      newsList = <div>There is no news yet</div>;
    } else {
      newsList = this.state.newsList.map(item =>
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-3">
              <img src="" alt="Something describing news" />
            </div>
            <div className="col-md-9">
              <h2>{item.title}</h2>
              <hr />
              <div><p>{item.shortText}</p></div>
              <Link className="btn btn-primary" to="">Read more</Link>
            </div>
          </div>
        </div>);
    }
    return (
      <div>
        {newsList}
      </div>
    );
  }
}

Home.propTypes = {
  lang: React.PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps)(Home);
