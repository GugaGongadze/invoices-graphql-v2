import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import format from 'date-fns/format';
import { Tabs, Tab } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import deleteInvoiceMutation from '../mutations/DeleteInvoice';
import currentUserQuery from '../queries/CurrentUser';
import getInvoicesQuery from '../queries/GetInvoices';
import getInvoicesByUserIdQuery from '../queries/GetInvoicesByUserId';

import Navbar from './Navbar';

const Container = styled.div`
  height: 100vh;
`;

const ClickableTr = styled.tr`
  cursor: pointer;
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

export const LINKS_PER_PAGE = 5;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page),
      limit: 5
    };
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

  onInvoiceClick(id, e) {
    this.props.history.push(`/details/${id}`);
  }

  onPrevClick() {
    console.log(this.state);
    this.setState(prevState => {
      return { page: prevState.page - 1 };
    });
    this.props.history.push(`/page/${this.state.page - 1}`);
  }

  onNextClick() {
    console.log(this.state);
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
    this.props.history.push(`/page/${this.state.page + 1}`);
  }

  onInvoiceSearch(e) {
    console.log(e.target.value);
    const value = e.target.value;
    const trying = this.props.invoicesQuery
      .fetchMore({
        variables: {
          limit: 0,
          skip: 0
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          // console.log(fetchMoreResult, 'asdasd');
        }
      })
      .then(data => {
        data.data.getInvoices.map(invoice => {
          if (invoice.name.includes(value)) {
            console.log(invoice.name, invoice.id);
          }
        });
        // return data.data.getInvoices.name.includes(e.target.value)
      });
    console.log(trying);
  }

  render() {
    if (
      this.props.invoicesQuery.loading ||
      !this.props.currentUser.currentUser ||
      !this.props.userInvoices ||
      this.props.currentUser.loading
    )
      return <div />;

    const invoices = this.props.invoicesQuery.getInvoices;

    const userInvoices = this.props.userInvoices
      ? this.props.userInvoices.getInvoicesByUserId
      : [];

    return (
      <div>
        <Container className="container">
          <input
            className="form-control"
            type="search"
            name="search"
            onChange={this.onInvoiceSearch.bind(this)}
          />
          <br />
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Total Invoices">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Creation Date</th>
                      <th>Due Date</th>
                      <th>Description</th>
                      <th>Contact Name</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices &&
                      invoices.map(invoice => {
                        return (
                          <ClickableTr
                            key={invoice.id}
                            onClick={e => this.onInvoiceClick(invoice.id, e)}
                          >
                            <td>{invoice.name}</td>
                            <td>{format(invoice.created, 'DD/MM/YYYY')}</td>
                            <td>{format(invoice.date, 'DD/MM/YYYY')}</td>
                            <td>{invoice.description}</td>
                            <td>{invoice.contactName}</td>
                            <td>{invoice.address}</td>
                          </ClickableTr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <SpaceBetween>
                <PrevButton
                  onClick={this.onPrevClick.bind(this)}
                  disabled={parseInt(this.props.match.params.page) === 1}
                  className="btn btn-info"
                >
                  Previous
                </PrevButton>
                <NextButton
                  onClick={this.onNextClick.bind(this)}
                  className="btn btn-info"
                >
                  Next
                </NextButton>
              </SpaceBetween>
            </Tab>
            <Tab eventKey={2} title="My Invoices">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Creation Date</th>
                      <th>Due Date</th>
                      <th>Description</th>
                      <th>Contact Name</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userInvoices &&
                      userInvoices.map(userInvoice => {
                        return (
                          <ClickableTr
                            key={userInvoice.id}
                            onClick={e =>
                              this.onInvoiceClick(userInvoice.id, e)
                            }
                          >
                            <td>{userInvoice.name}</td>
                            <td>{format(userInvoice.created, 'DD/MM/YYYY')}</td>
                            <td>{format(userInvoice.date, 'DD/MM/YYYY')}</td>
                            <td>{userInvoice.description}</td>
                            <td>{userInvoice.contactName}</td>
                            <td>{userInvoice.address}</td>
                            <td>
                              <Link
                                to={`/edit/${userInvoice.id}`}
                                className="btn btn-large btn-warning"
                                onClick={e =>
                                  this.onInvoiceClick(userInvoice.id, e)
                                }
                              >
                                Edit
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-large btn-danger"
                                onClick={e =>
                                  this.onInvoiceDelete(userInvoice.id, e)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </ClickableTr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default compose(
  graphql(currentUserQuery, { name: 'currentUser' }),
  graphql(getInvoicesByUserIdQuery, {
    name: 'userInvoices',
    options: props => {
      return { variables: { userId: props.currentUser.currentUser.id } };
    }
  }),
  graphql(getInvoicesQuery, {
    name: 'invoicesQuery',
    options: props => {
      const page = parseInt(window.location.pathname.slice(6));
      const limit = 5;
      const skip = page * limit - limit;
      console.log(skip, limit);
      return {
        variables: { skip, limit }
      };
    }
  }),
  graphql(deleteInvoiceMutation, { name: 'deleteInvoiceMutation' })
)(withRouter(Dashboard));
