import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import InvoiceQuery from './InvoiceQuery';
import currentUserQuery from '../queries/CurrentUser';
import getInvoicesQuery from '../queries/GetInvoices';
import getInvoicesBySearchTextQuery from '../queries/GetInvoicesBySearchText';

const Container = styled.div`
  height: 100vh;
`;

class Dashboard extends Component {
  state = {
    limit: 10,
    searchText: ''
  };

  onInvoiceSearch = debounce(e => {
    const searchText = e.target.value;

    this.setState({
      searchText
    });
  }, 350);

  render() {
    if (!this.props.currentUser.currentUser || this.props.currentUser.loading)
      return <div />;

    return (
      <Container className="container">
        <input
          className="form-control"
          type="search"
          name="search"
          placeholder="Search invoice by name"
          onChange={e => {
            e.persist();
            this.onInvoiceSearch(e);
          }}
        />
        <div>
          {this.state.searchText.length > 0 ? (
            <InvoiceQuery
              currentUser={this.props.currentUser}
              query={getInvoicesBySearchTextQuery}
              queryName="getInvoicesBySearchText"
              searchText={this.state.searchText}
              limit={this.state.limit}
              skip={this.state.skip}
            />
          ) : (
            <InvoiceQuery
              currentUser={this.props.currentUser}
              query={getInvoicesQuery}
              queryName="getInvoices"
              searchText=""
              limit={this.state.limit}
              skip={this.state.skip}
            />
          )}
        </div>
      </Container>
    );
  }
}

export default compose(graphql(currentUserQuery, { name: 'currentUser' }))(
  Dashboard
);
