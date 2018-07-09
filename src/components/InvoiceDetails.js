import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

import query from '../queries/GetInvoiceDetailsByInvoiceId';
import CreateInvoiceDetails from './CreateInvoiceDetails';
import mutation from '../mutations/DeleteInvoiceDetails';

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  height: 100vh;
`;

class InvoiceDetails extends Component {
  onInvoiceDetailDelete() {
    const id = this.props.data.getInvoiceDetailsByInvoiceId.id;

    this.props
      .deleteInvoiceDetailMutation({
        variables: {
          id
        },
        refetchQueries: [
          {
            query,
            variables: {
              invoiceId: this.props.match.params.invoiceId
            }
          }
        ]
      })
      .then(() => this.props.history.push('/dashboard'));
  }

  onInvoiceEditClick() {
    this.props.history.push(`/details/${this.props.match.params.invoiceId}/edit`);
  }

  render() {
    if (this.props.data.loading) return <div />;

    if (this.props.data.getInvoiceDetailsByInvoiceId) {
      const {
        name,
        description,
        quantity,
        price,
        total
      } = this.props.data.getInvoiceDetailsByInvoiceId;

      return (
        <div>
          <Navbar />
          <Container className="container">
            <Row className="row">
              <h3>Here, have some more information 👏</h3>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{name}</td>
                      <td>{description}</td>
                      <td>{quantity}</td>
                      <td>{price}</td>
                      <td>{total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3>Some information missing or not accurate? 🤔</h3>
              <h3>
                Go ahead and{' '}
                <button
                  className="btn btn-large btn-warning"
                  onClick={this.onInvoiceEditClick.bind(this)}
                >
                  Edit It
                </button>
              </h3>

              <h3>
                Is it <em>too</em> much information? 😉
              </h3>
              <h3>
                You can also{' '}
                <button
                  className="btn btn-large btn-danger"
                  onClick={this.onInvoiceDetailDelete.bind(this)}
                >
                  Delete It
                </button>
              </h3>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <CreateInvoiceDetails invoiceId={this.props.match.params.invoiceId} />
      );
    }
  }
}

export default compose(
  graphql(query, {
    options: props => {
      console.log(props);
      return { variables: { invoiceId: props.match.params.invoiceId } };
    }
  }),
  graphql(mutation, { name: 'deleteInvoiceDetailMutation' })
)(withRouter(InvoiceDetails));
