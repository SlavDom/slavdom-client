import React from "react";
import {Router, Route} from "react-router";
import Home from "./pages/home/home.component";

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        
        this.state = {
            open: false,
            logged: false
        };

        // $.ajax(
        //     '/api/translation',
        //     {
        //         method: 'GET',
        //         data: [id=1],
        //         success: function () {
        //
        //         }
        //     }
        // );
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
                    <Home/>
                </div>
        );
    }
}

export default App;
