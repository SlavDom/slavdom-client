import React from 'react';

import NavBar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import FlashMessagesList from './components/common/FlashMessagesList';
import './App.css';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handlerLang = this.handlerLang.bind(this);

    this.state = {
      open: false,
      logged: false,
      lang: 'en',
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handlerLang(e) {
    this.setState({
      lang: e,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <NavBar lang={this.state.lang} handlerLang={this.handlerLang} />
        <FlashMessagesList />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
