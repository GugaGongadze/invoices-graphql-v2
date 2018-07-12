import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-bootstrap';

import deleteInvoiceMutation from '../mutations/DeleteInvoice';
import createInvoiceMutation from '../mutations/CreateInvoice';
import currentUserQuery from '../queries/CurrentUser';
import getInvoicesQuery from '../queries/GetInvoices';
import getInvoicesByUserIdQuery from '../queries/GetInvoicesByUserId';


import ClickableRow from './ClickableRow';
import Navbar from './Navbar';
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

// const CreateNewInvoiceButton = styled.bu`
//   cursor: pointer;
// `

class Dashboard extends Component {
  state = {
    page: parseInt(this.props.match.params.page) || 1,
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

  componentDidMount() {
    this.props.invoicesQuery
      .fetchMore({
        variables: {
          limit: 0,
          skip: 0
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
        }
      })
      .then(data => {
        this.setState({
          invoices: [...data.data.getInvoices]
        });
      });
  }

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

  onPrevClick() {
    this.setState(prevState => {
      return { page: prevState.page - 1 };
    });
    this.props.history.push(`/page/${this.state.page - 1}`);
  }

  onNextClick() {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
    this.props.history.push(`/page/${this.state.page + 1}`);
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

    this.props
      .createInvoiceMutation({
        variables: {
          userId,
          name,
          description,
          date,
          contactName,
          address
        },
        refetchQueries: [
          { query: getInvoicesQuery },
          {
            query: getInvoicesByUserIdQuery,
            variables: {
              userId
            }
          }
        ]
      })
      .then(() => this.props.history.push('/page/1'));
  }

  render() {
    if (
      this.props.invoicesQuery.loading ||
      !this.props.currentUser.currentUser ||
      this.props.currentUser.loading
    )
      return <div />;

    const invoices = this.props.invoicesQuery.getInvoices;

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
              <Table
                userId={this.props.currentUser.currentUser.id}
                data={
                  invoices &&
                  this.state.filteredInvoices.length === 0 &&
                  !this.state.searchText.length
                    ? invoices
                    : this.state.filteredInvoices
                }
              />

              <button
                className="btn"
                data-toggle="modal"
                data-target="#newInvoiceModal"
              >
                <span className="glyphicon glyphicon-plus" aria-hidden="true" />
              </button>

              <div id="newInvoiceModal" className="modal fade" role="dialof">
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
                      <form className="jumbotron">
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
                          <label htmlFor="description">Description</label>
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
                          <label htmlFor="contactName">Contact Name</label>
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
                          type="submit"
                          className="btn btn-large btn-success"
                          onClick={this.onInvoiceSubmit.bind(this)}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <SpaceBetween>
                <PrevButton
                  onClick={this.onPrevClick.bind(this)}
                  disabled={
                    parseInt(this.props.match.params.page) === 1 ||
                    !this.props.match.params.page
                  }
                  className="btn btn-info"
                >
                  Previous
                </PrevButton>
                <NextButton
                  disabled={
                    parseInt(this.props.match.params.page) >
                    this.state.invoices.length / this.state.limit
                  }
                  onClick={this.onNextClick.bind(this)}
                  className="btn btn-info"
                >
                  Next
                </NextButton>
              </SpaceBetween>
            </Tab>
            <Tab eventKey={2} title="My Invoices">
              <Table
                userId={this.props.currentUser.currentUser.id}
                data={
                  userInvoices &&
                  this.state.filteredInvoices.length === 0 &&
                  !this.state.searchText.length
                    ? userInvoices
                    : this.state.filteredInvoices
                }
              />
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default compose(
  graphql(currentUserQuery, { name: 'currentUser' }),
  graphql(getInvoicesQuery, {
    name: 'invoicesQuery',
    options: props => {
      const page = parseInt(window.location.pathname.slice(6)) || 1;
      const limit = 5;
      const skip = page * limit - limit;
      return {
        variables: { skip, limit }
      };
    }
  }),
  graphql(deleteInvoiceMutation, { name: 'deleteInvoiceMutation' }),
  graphql(createInvoiceMutation, {name: 'createInvoiceMutation'})
)(withRouter(Dashboard));
