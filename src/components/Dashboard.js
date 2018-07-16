import React, { Component, Fragment } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import currentUserQuery from '../queries/CurrentUser';
import getInvoicesQuery from '../queries/GetInvoices';

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
    limit: 10,
    filteredInvoices: [],
    searchText: ''
  };

  onInvoiceSearch(e, data) {
    const searchText = e.target.value;

    this.setState({
      searchText: searchText
    });

    if (searchText === '') {
      this.setState({
        filteredInvoices: []
      });
    } else {
      const values = data.getInvoices.filter(invoice => {
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
        <Query
          query={getInvoicesQuery}
          variables={{
            skip: this.state.page * this.state.limit - this.state.limit,
            limit: this.state.limit
          }}
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) return 'Loading';
            if (error) return 'Error';
            return (
              <Fragment>
                <input
                  className="form-control"
                  type="search"
                  name="search"
                  placeholder="Search invoice by name"
                  onChange={e => this.onInvoiceSearch(e, data)}
                />
                <br />
                <Table
                  handleInvoiceDelete={() => refetch()}
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
                    handleInvoiceCreate={() => refetch()}
                  />

                  <PrevButton
                    disabled={data.getInvoices.length <= 10}
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
                    className="btn btn-info"
                  >
                    <span
                      className="glyphicon glyphicon-arrow-up"
                      aria-hidden="true"
                    />
                  </PrevButton>
                  <NextButton
                    disabled={data.getInvoices.length}
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

export default compose(graphql(currentUserQuery, { name: 'currentUser' }))(
  withRouter(Dashboard)
);
