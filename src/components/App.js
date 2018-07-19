import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';

import query from '../queries/CurrentUser';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

class App extends Component {
  render() {
    if (this.props.data.loading) return <div />;


    return this.props.data.currentUser ? (
      <div>
        <Navbar />
        <Dashboard />
      </div>
    ) : (
      <Login />
    );
  }
}

export default graphql(query)(App);
