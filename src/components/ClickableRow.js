import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { graphql, compose } from 'react-apollo';

import { withRouter, Link } from 'react-router-dom';
import mutation from '../mutations/CreateInvoiceDetails';
import invoiceDetailsQuery from '../queries/GetInvoiceDetailsByInvoiceId';
import query from '../queries/CurrentUser';

import './Dashboard.css';

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
                onClick={this.toggleInvoiceDetails.bind(this)}
                data-index={`inv-${i}`}
              >
                <td>{invoice.name}</td>
                <td>{format(invoice.created, 'DD/MM/YYYY')}</td>
                <td>{format(invoice.date, 'DD/MM/YYYY')}</td>
                <td>{invoice.description}</td>
                <td>{invoice.contactName}</td>
                <td>{invoice.address}</td>
              </ClickableTr>
              {invoice.invoiceDetails.length > 0 ? (
                invoice.invoiceDetails.map(invoiceDetail => {
                  return (
                    <tr key={invoiceDetail.id}>
                      <th className="p-0">
                        <div className="invdet">Name</div>
                        <div className="invdet">
                          {invoiceDetail.name || '&nbsp;'}
                        </div>
                      </th>
                      <th className="p-0">
                        <div className="invdet">Description</div>
                        <div className="invdet">
                          {invoiceDetail.description || '&nbsp;'}
                        </div>
                      </th>
                      <th className="p-0">
                        <div className="invdet">Quantity</div>
                        <div className="invdet">
                          {invoiceDetail.quantity || '&nbsp;'}
                        </div>
                      </th>
                      <th className="p-0">
                        <div className="invdet">Price</div>
                        <div className="invdet">
                          {invoiceDetail.price || '&nbsp;'}
                        </div>
                      </th>
                      <th className="p-0">
                        <div className="invdet">Total</div>
                        <div className="invdet">
                          {invoiceDetail.total || '&nbsp;'}
                        </div>
                      </th>
                      <th className="p-0">
                        <div className="invdet">Add Details</div>
                        <div className="invdet">
                          <button
                            data-toggle="modal"
                            data-target="#addInvoiceDetailModal1"
                            className="btn btn-large btn-success"
                          >
                            add more
                          </button>
                          <div
                            id="addInvoiceDetailModal1"
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
                        </div>
                      </th>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="p-0">
                    <div className="invdet">
                      this invoice has no details go ahead and{' '}
                      <button
                        data-toggle="modal"
                        data-target="#addInvoiceDetailModal"
                        className="btn btn-large btn-success"
                      >
                        add some
                      </button>
                      <div
                        id="addInvoiceDetailModal"
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
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    );
  }
}

export default compose(graphql(mutation))(withRouter(ClickableRow));
