import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import Navbar from './Navbar';

import currentUserQuery from '../queries/CurrentUser';
import invoiceDetailsQuery from '../queries/GetInvoiceDetailsByInvoiceId';
import mutation from '../mutations/CreateInvoiceDetails';

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  height: 100vh;
`;

class CreateInvoiceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      total: 0
    };
  }

  onInvoiceDetailSubmit(e) {
    e.preventDefault();

    const userId = this.props.data.currentUser.id;
    const { invoiceId } = this.props;
    const { name, description, quantity, price } = this.state;
    const total = quantity * price;


    this.props
      .createInvoice({
        variables: {
          userId,
          invoiceId,
          name,
          description,
          quantity,
          price,
          total
        },
        refetchQueries: [
          {
            query: invoiceDetailsQuery,
            variables: {
              invoiceId: this.props.match.params.invoiceId
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
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Quantity"
                    value={this.state.quantity || ''}
                    onChange={e =>
                      this.setState({
                        quantity: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Price"
                    value={this.state.price || ''}
                    onChange={e =>
                      this.setState({
                        price: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="total">Total</label>
                  <input
                    type="text"
                    name="total"
                    className="form-control"
                    placeholder="Tescription"
                    value={this.state.quantity * this.state.price || 0}
                    onChange={e =>
                      this.setState({
                        total: e.target.value
                      })
                    }
                    required
                    disabled
                  />
                </div>
                <button
                  className="btn btn-large btn-success"
                  type="submit"
                  onClick={this.onInvoiceDetailSubmit.bind(this)}
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

export default compose(
  graphql(currentUserQuery),
  graphql(mutation, { name: 'createInvoice' })
)(withRouter(CreateInvoiceDetails));
