import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';

import App from './App';
import Login from './Login';
import Signup from './Signup';

const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id || null
});

const client = new ApolloClient({
  link: new HttpLink(),
  cache
});

const Routes = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/page/:page" component={App} />
        <Route path="/*" component={App} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default Routes;
