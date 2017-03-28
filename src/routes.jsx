import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app/App';
import Home from './app/pages/home/Home';
import About from './app/pages/about/About';
import Contacts from './app/pages/contacts/Contacts';
import NotFound from './app/pages/not-found/NotFound';
import FAQ from './app/pages/faq/Faq';
import Signin from './app/pages/signin/Signin';
import Signup from './app/pages/signup/Signup';
import News from './app/pages/news/News';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="contacts" component={Contacts} />
    <Route path="faq" component={FAQ} />
    <Route path="signin" component={Signin} />
    <Route path="signup" component={Signup} />
    <Route path="news" component={Home} />
    <Route path="news/:theme" component={News} />
    <Route path="*" component={NotFound} />
  </Route>
);
