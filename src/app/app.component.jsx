import React from "react";
import NavBar from "./components/navbar/navbar.component";
import Footer from "./components/footer/footer.component";

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        
        this.state = {
            open: false,
            logged: false
        };

    }

    handleRequestClose() {
        this.setState({
            open: false
        });
    }

    handleTouchTap() {
        this.setState({
            open: true
        });
    }

    render() {
        return (
                <div className="wrapper">
                    <NavBar/>
                    {this.props.children}
                    <Footer/>
                </div>
        );
    }
}

export default App;
