import React, { Component, Fragment } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import deleteInvoiceMutation from '../mutations/DeleteInvoice';
import createInvoiceMutation from '../mutations/CreateInvoice';
import currentUserQuery from '../queries/CurrentUser';
import getInvoicesQuery from '../queries/GetInvoices';
import getInvoicesByUserIdQuery from '../queries/GetInvoicesByUserId';

import Table from './Table';
import AddInvoiceButton from './AddInvoiceButton';
import AddInvoiceModal from './AddInvoiceModal';

const Container = styled.div`
  height: 100vh;
`;

const PrevButton = styled.button`
  align: left;
`;

const NextButton = styled.button`
  align: right;
`;
const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

class Dashboard extends Component {
  state = {
    page: 1,
    limit: 5,
    invoices: [],
    filteredInvoices: [],
    searchText: ''
  };

  onInvoiceDelete(id, e) {
    e.stopPropagation();

    this.props
      .deleteInvoiceMutation({
        variables: {
          id
        },
        refetchQueries: [
          { query: getInvoicesQuery },
          {
            query: getInvoicesByUserIdQuery,
            variables: {
              userId: this.props.currentUser.currentUser.id
            }
          }
        ]
      })
      .then(name => console.log(name));
  }

  onInvoiceSearch(e) {
    const searchText = e.target.value;

    this.setState({
      searchText: searchText
    });

    if (searchText === '') {
      this.setState({
        filteredInvoices: []
      });
    } else {
      const values = this.state.invoices.filter(invoice => {
        return invoice.name.includes(searchText);
      });

      this.setState({
        filteredInvoices: [...values]
      });
    }
  }

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
          onChange={this.onInvoiceSearch.bind(this)}
        />

        <br />

        <Query
          query={getInvoicesQuery}
          variables={{
            skip: this.state.page * this.state.limit - this.state.limit,
            limit: this.state.limit
          }}
        >
          {({ loading, error, data, fetchMore, startPolling, stopPolling }) => {
            if (loading) return 'Loading';
            if (error) return 'Error';
            console.log(data);
            return (
              <Fragment>
                <Table
                  userId={this.props.currentUser.currentUser.id}
                  data={
                    this.state.filteredInvoices.length === 0 &&
                    !this.state.searchText.length
                      ? data.getInvoices
                      : this.state.filteredInvoices
                  }
                />

                <SpaceBetween>
                  <AddInvoiceButton />
                  <AddInvoiceModal
                    userId={this.props.currentUser.currentUser.id}
                  />

                  <PrevButton
                    onClick={() =>
                      fetchMore({
                        variables: {
                          skip: 0,
                          limit: data.getInvoices.length - this.state.limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return fetchMoreResult;
                        }
                      })
                    }
                    disabled={false}
                    className="btn btn-info"
                  >
                    <span
                      className="glyphicon glyphicon-arrow-up"
                      aria-hidden="true"
                    />
                  </PrevButton>
                  <NextButton
                    disabled={
                      this.state.page >
                      data.getInvoices.length / this.state.limit
                    }
                    onClick={() =>
                      fetchMore({
                        variables: {
                          skip: 0,
                          limit: this.state.limit + data.getInvoices.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return fetchMoreResult;
                        }
                      })
                    }
                    className="btn btn-info"
                  >
                    <span
                      className="glyphicon glyphicon-arrow-down"
                      aria-hidden="true"
                    />
                  </NextButton>
                </SpaceBetween>
              </Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default compose(
  graphql(currentUserQuery, { name: 'currentUser' }),
  graphql(deleteInvoiceMutation, { name: 'deleteInvoiceMutation' }),
  graphql(createInvoiceMutation, { name: 'createInvoiceMutation' })
)(withRouter(Dashboard));
