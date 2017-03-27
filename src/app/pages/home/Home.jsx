import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
        <div>
          <h1>{item.title}</h1>
          <div><p>{item.shortText}</p></div>
        </div>);
    }
    return (
      /* <p>
       Interslavic is a language used by Slavs of different nations for communication among themselves.
       This is made possible by the fact that the Slavic languages are a relatively coherent family:
       knowing one of them is usually sufficient to get a rough idea of what a text in any other Slavic language is
       about.Throughout the centuries, Slavs have learned to talk to their neighbours by means of simple,
       improvised language forms.Simultaneously, the similarity of the Slavic languages has inspired linguists and
       others to create a generic Slavic language that would be understandable for all Slavs alike.
       This includes the famous Church Slavonic language from the 9th century, as well as many other
       projects,published from the 16th century onwards under names like „Pan-Slavic”, „Interslavic”, „New Slavic”,
       „Common Slavic” or simply „Slavic”, all based on the same assumptions and therefore nearly identical.
       </p>
       */
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
