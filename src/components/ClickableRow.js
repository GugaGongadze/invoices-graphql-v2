import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { graphql, compose } from 'react-apollo';

import { withRouter } from 'react-router-dom';
import mutation from '../mutations/CreateInvoiceDetails';
import query from '../queries/CurrentUser';

import InvoiceDetails from './InvoiceDetails';

const ClickableTr = styled.tr`
  cursor: pointer;
`;

class ClickableRow extends Component {
  state = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    total: 0
  };

  onInvoiceClick(id, e) {
    this.props.history.push(`/details/${id}`);
  }

  toggleInvoiceDetails(e) {
    const targetInvoiceDetails = e.target.parentNode.nextSibling;
    if (targetInvoiceDetails) targetInvoiceDetails.classList.toggle('active');
  }

  onInvoiceDetailSubmit(e) {
    console.log(this);
    e.preventDefault();

    const { userId } = this.props;
    const invoiceId = e.target.dataset.invoiceid;
    const { name, description, quantity, price } = this.state;
    const total = quantity * price;

    this.props
      .mutate({
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
            query
          }
        ]
      })
      .then(() => this.history.push('/'));
  }

  render() {
    return (
      <tbody>
        {this.props.data.map((invoice, i) => {
          return (
            <Fragment key={invoice.id}>
              <ClickableTr
                data-toggle="modal"
                data-target="#invoiceDetailsModal"
                data-index={`inv-${i}`}
              >
                <td>{invoice.name}</td>
                <td>{format(invoice.created, 'DD/MM/YYYY')}</td>
                <td>{format(invoice.date, 'DD/MM/YYYY')}</td>
                <td>{invoice.description}</td>
                <td>{invoice.contactName}</td>
                <td>{invoice.address}</td>
              </ClickableTr>
              <div
                id="invoiceDetailsModal"
                className="modal fade"
                role="dialog"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title">Invoice Details</h4>
                    </div>
                    <div className="modal-body">
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
                          {invoice.invoiceDetails.map(invoiceDetail => {
                            return (
                              <InvoiceDetails
                                key={invoiceDetail.id}
                                data={invoiceDetail}
                                currentUser={this.props.userId}
                              />
                            );
                          })}
                        </table>
                      </div>
                      <button
                        className="btn btn-info"
                        data-toggle="modal"
                        data-target="#addInvoiceDetailModal"
                      >
                        <span
                          className="glyphicon glyphicon-plus"
                          aria-hidden="true"
                        />
                      </button>

                      <div
                        id="addInvoiceDetailModal"
                        className="modal fade"
                        role="dialog"
                      >
                        <div className="modal-dialog modal-sm">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </button>
                              <h4 className="modal-title">
                                Add Invoice Details
                              </h4>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={e =>
                                      this.setState({
                                        name: e.target.value
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={e =>
                                      this.setState({
                                        description: e.target.value
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    placeholder="Quantity"
                                    value={this.state.quantity}
                                    onChange={e =>
                                      this.setState({
                                        quantity: e.target.value
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    placeholder="Price"
                                    value={this.state.price}
                                    onChange={e =>
                                      this.setState({
                                        price: e.target.value
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    name="total"
                                    className="form-control"
                                    placeholder="Total"
                                    value={
                                      this.state.quantity * this.state.price
                                    }
                                    onChange={e =>
                                      this.setState({
                                        total: e.target.value
                                      })
                                    }
                                    disabled
                                    required
                                  />
                                </div>
                                <button
                                  data-invoiceid={invoice.id}
                                  className="btn btn-large btn-success"
                                  type="submit"
                                  onClick={this.onInvoiceDetailSubmit.bind(
                                    this
                                  )}
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
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
            </Fragment>
          );
        })}
      </tbody>
    );
  }
}

export default compose(graphql(mutation))(withRouter(ClickableRow));
