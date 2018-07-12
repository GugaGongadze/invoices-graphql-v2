import React, { Component, Fragment } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-bootstrap';

import deleteInvoiceMutation from '../mutations/DeleteInvoice';
import createInvoiceMutation from '../mutations/CreateInvoice';
import currentUserQuery from '../queries/CurrentUser';
import getInvoicesQuery from '../queries/GetInvoices';
import getInvoicesByUserIdQuery from '../queries/GetInvoicesByUserId';

import Table from './Table';

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
    searchText: '',
    name: '',
    description: '',
    date: '',
    contactName: '',
    address: ''
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

  onInvoiceSubmit(e) {
    e.preventDefault();

    const userId = this.props.currentUser.currentUser.id;
    const { name, description, date, contactName, address } = this.state;

    this.props.createInvoiceMutation({
      variables: {
        userId,
        name,
        description,
        date,
        contactName,
        address
      },
      refetchQueries: [
        {
          query: getInvoicesQuery,
          variables: {
            skip: 0,
            limit: 5
          }
        }
      ]
    });
  }

  render() {
    if (!this.props.currentUser.currentUser || this.props.currentUser.loading)
      return <div />;

    const userInvoices = this.props.currentUser
      ? this.props.currentUser.currentUser.invoices
      : [];

    return (
      <div>
        <Container className="container">
          <input
            className="form-control"
            type="search"
            name="search"
            placeholder="Search invoice by name"
            onChange={this.onInvoiceSearch.bind(this)}
          />

          <br />

          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Total Invoices">
              <Query
                query={getInvoicesQuery}
                variables={{
                  skip: this.state.page * this.state.limit - this.state.limit,
                  limit: this.state.limit
                }}
              >
                {({
                  loading,
                  error,
                  data,
                  fetchMore,
                  startPolling,
                  stopPolling
                }) => {
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
                        <button
                          className="btn"
                          data-toggle="modal"
                          data-target="#newInvoiceModal"
                        >
                          <span
                            className="glyphicon glyphicon-plus"
                            aria-hidden="true"
                          />
                        </button>

                        <div
                          id="newInvoiceModal"
                          className="modal fade"
                          role="dialog"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                >
                                  &times;
                                </button>
                                <h4 className="modal-title">Add New Invoice</h4>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      placeholder="Invoice name"
                                      value={this.state.name || ''}
                                      onChange={e =>
                                        this.setState({
                                          name: e.target.value
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="description">
                                      Description
                                    </label>
                                    <input
                                      type="text"
                                      name="description"
                                      className="form-control"
                                      placeholder="Description"
                                      value={this.state.description || ''}
                                      onChange={e =>
                                        this.setState({
                                          description: e.target.value
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="date">Due Date</label>
                                    <input
                                      type="date"
                                      name="date"
                                      className="form-control"
                                      placeholder="Due Date"
                                      value={this.state.date || ''}
                                      onChange={e =>
                                        this.setState({
                                          date: e.target.value
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="contactName">
                                      Contact Name
                                    </label>
                                    <input
                                      type="text"
                                      name="contactName"
                                      className="form-control"
                                      placeholder="Contact Name"
                                      value={this.state.contactName || ''}
                                      onChange={e =>
                                        this.setState({
                                          contactName: e.target.value
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                      type="text"
                                      name="address"
                                      className="form-control"
                                      placeholder="Contact Name"
                                      value={this.state.address || ''}
                                      onChange={e =>
                                        this.setState({
                                          address: e.target.value
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <button
                                    data-dismiss="modal"
                                    type="submit"
                                    className="btn btn-large btn-success"
                                    onClick={this.onInvoiceSubmit.bind(this)}
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <PrevButton
                          onClick={() =>
                            fetchMore({
                              variables: {
                                skip: 0,
                                limit:
                                  data.getInvoices.length - this.state.limit
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
                                limit:
                                  this.state.limit + data.getInvoices.length
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
            </Tab>
            <Tab eventKey={2} title="My Invoices">
              {/* <Table
                userId={this.props.currentUser.currentUser.id}
                data={
                  userInvoices &&
                  this.state.filteredInvoices.length === 0 &&
                  !this.state.searchText.length
                    ? userInvoices
                    : this.state.filteredInvoices
                }
              /> */}
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default compose(
  graphql(currentUserQuery, { name: 'currentUser' }),
  graphql(deleteInvoiceMutation, { name: 'deleteInvoiceMutation' }),
  graphql(createInvoiceMutation, { name: 'createInvoiceMutation' })
)(withRouter(Dashboard));
