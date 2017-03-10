import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import Footer from "../../components/footer/footer.component";
import {browserHistory} from "react-router";

class Home extends React.Component {

    constructor() {
        super();
        this.app_card_text = "Interslavic is a language used by Slavs of different nations for communication among themselves.\
        This is made possible by the fact that the Slavic languages are a relatively coherent family:\
        knowing one of them is usually sufficient to get a rough idea of what a text in any other Slavic language is about.\
        Throughout the centuries, Slavs have learned to talk to their neighbours by means of simple, improvised language forms.\
        Simultaneously, the similarity of the Slavic languages has inspired linguists and others to create a generic Slavic language that would be understandable for all Slavs alike.\
        This includes the famous Church Slavonic language from the 9th century, as well as many other projects, published from the 16th century\
        onwards under names like „Pan-Slavic”, „Interslavic”, „New Slavic”, „Common Slavic” or simply „Slavic”, all based on the same assumptions and therefore nearly identical.";
    }
        
    render() {
        // browserHistory.push('/');
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <p>{this.app_card_text}</p>
                </div>
                <Footer/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Home;