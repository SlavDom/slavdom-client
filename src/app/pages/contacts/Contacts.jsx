import React from "react";
import ContactForm from "../../components/forms/contact-form/ContactForm";

class Contacts extends React.Component {

    constructor() {
        super();
        this.title = 'Contacts';
    }

    render() {
        return (
            <div className="container-fluid">
                <h2 value={this.title}/>
                <div>
                    <ContactForm/>
                </div>
            </div>
        )
    }
}

export default Contacts;