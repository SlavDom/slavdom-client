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
    return (
      <div className="wrapper">
        <NavBar />
        <FlashMessagesList />
        <div className="container-fluid">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}


App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
