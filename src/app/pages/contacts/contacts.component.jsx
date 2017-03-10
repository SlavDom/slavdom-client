import React from "react";
import ContactForm from "../../components/contact-form/contact-form.component";

class Contacts extends React.Component {

    private title;

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