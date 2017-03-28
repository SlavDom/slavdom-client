import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class News extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      newsList: {},
      lang: props.lang,
    };
  }

  componentDidMount() {
    axios.get(`/api/news/get?lang=${this.state.lang}&theme=${this.props.params.theme}`)
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
      axios.get(`/api/news/get?lang=${currentValue}&theme=${this.props.params.theme}`)
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
    return (
      <div>
        <h1>{this.state.newsList.title}</h1>
        <p> This is a news page with theme: {this.props.params.theme}.</p>
        <div>
          {this.state.newsList.fullText}
        </div>
      </div>
    );
  }
}

News.propTypes = {
  lang: React.PropTypes.string.isRequired,
  params: React.PropTypes.shape(React.PropTypes.string),
};

News.defaultProps = {
  params: {},
};

function mapStateToProps(state) {
  return {
    lang: state.languageChooser,
  };
}

export default connect(mapStateToProps)(News);
