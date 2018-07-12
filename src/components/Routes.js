import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
// import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';

import App from './App';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import EditInvoice from './EditInvoice';
import CreateInvoice from './CreateInvoice';
import InvoiceDetails from './InvoiceDetails';
import EditInvoiceDetails from './EditInvoiceDetails';

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
        <Route path="/edit/:id" component={EditInvoice} />
        <Route path="/invoice/new" component={CreateInvoice} />
        <Route exact path="/details/:invoiceId" component={InvoiceDetails} />
        <Route path="/details/:invoiceId/edit" component={EditInvoiceDetails} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default Routes;
