import React, {Component} from "react";

export default class ContactForm extends Component {
    render() {
        return (
            <form method="post">
                <input type="text"/>
                <input type="submit"/>
            </form>
        );
    }
}
