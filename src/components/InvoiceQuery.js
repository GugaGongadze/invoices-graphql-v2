import React, { Fragment } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import styled from 'styled-components';

import Table from './Table';
import AddInvoiceButton from './AddInvoiceButton';
import AddInvoiceModal from './AddInvoiceModal';

const PrevButton = styled.button`
  align: left;
`;

const NextButton = styled.button`
  align: right;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
`;

const InvoiceQuery = props => (
  <Query
    query={props.query}
    variables={{ searchText: props.searchText, skip: props.skip, limit: props.limit }}
  >
    {({ loading, error, data, fetchMore, refetch }) => {
      if (loading) return 'Loading';
      if (error) return 'Error';

      return (
        <Fragment>
          <Table
            handleInvoiceDelete={() => refetch()}
            userId={props.currentUser.currentUser.id}
            data={data[props.queryName]}
          />

          <SpaceBetween>
            <AddInvoiceButton />
            <AddInvoiceModal
              userId={props.currentUser.currentUser.id}
              handleInvoiceCreate={() => refetch()}
            />

            <PrevButton
              disabled={data[props.queryName].length <= 5}
              onClick={() =>
                fetchMore({
                  variables: {
                    skip: 0,
                    limit:
                      data[props.queryName].length - props.limit / 2
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, null, fetchMoreResult);
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
              onClick={() =>
                fetchMore({
                  variables: {
                    skip: 0,
                    limit:
                      props.limit / 2 + data[props.queryName].length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, null, fetchMoreResult);
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
);

export default InvoiceQuery;
