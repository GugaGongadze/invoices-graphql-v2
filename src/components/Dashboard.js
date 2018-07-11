import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-bootstrap';

import deleteInvoiceMutation from '../mutations/DeleteInvoice';
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

class Dashboard extends Component {
  state = {
    page: parseInt(this.props.match.params.page) || 1,
    limit: 5,
    invoices: [],
    filteredInvoices: [],
    searchText: ''
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

  toggleInvoiceDetails = () => {
    console.log('ev');
    const { height } = this.state;

    this.setState({
      height: height === 0 ? 'auto' : 0
    });
  };

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
  graphql(deleteInvoiceMutation, { name: 'deleteInvoiceMutation' })
)(withRouter(Dashboard));
