import React from "react";

class About extends React.Component {

    constructor() {
        super();
        this.title = 'About';
    }

    render() {
        return (
            <div className="container-fluid">
                <h2 value={this.title}/>
                <div>
                    <p>About us</p>
                </div>
            </div>
    )
    }
}

export default About;