import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import query from '../queries/CurrentUser';
import getInvoicesQuery from '../queries/GetInvoices';
import getInvoicesByUserIdQuery from '../queries/GetInvoicesByUserId';
import mutation from '../mutations/CreateInvoice';

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  height: 100vh;
`;

class CreateInvoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      date: '',
      contactName: '',
      address: ''
    };
  }

  onInvoiceSubmit(e) {
    e.preventDefault();

    const userId = this.props.data.currentUser.id;
    const { name, description, date, contactName, address } = this.state;

    this.props
      .mutate({
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
      .then(() => this.props.history.push('/dashboard'));
  }

  render() {
    return (
      <div>
        <Navbar />
        <Container className="container">
          <Row className="row">
            <div className="col-xs-6">
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(withRouter(CreateInvoice)));
