import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './pages/home/Home';
import About from './pages/about/About';
import NotFound from './pages/not-found/NotFound';
import FAQ from './pages/faq/Faq';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import News from './pages/news/News';
import NavBar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import FlashMessagesList from './components/common/FlashMessagesList';
import './App.css';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
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

  render() {
    const { match } = this.props;
    return (
      <div className="wrapper">
        <NavBar />
        <FlashMessagesList />
        <div className="container-fluid">
          <Switch>
            <Route exact path={match.url} component={Home} />
            <Route path={`${match.url}about`} component={About} />
            <Route path={`${match.url}faq`} component={FAQ} />
            <Route path={`${match.url}signin`} component={Signin} />
            <Route path={`${match.url}signup`} component={Signup} />
            <Route exact path={`${match.url}news`} component={Home} />
            <Route path={`${match.url}news/:theme`} component={News} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.shape([PropTypes.string]).isRequired,
};

export default App;
