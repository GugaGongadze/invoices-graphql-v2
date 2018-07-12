import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import mutation from '../mutations/EditInvoiceDetails';
import GetInvoices from '../queries/GetInvoices';

class EditInvoiceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.data.name,
      description: this.props.data.description,
      quantity: this.props.data.quantity,
      price: this.props.data.price,
      total: this.props.data.total0
    };
  }

  onInvoiceDetailSubmit(e) {
    e.preventDefault();
    const { id } = this.props.data;
    const { name, description, quantity, price } = this.state;
    const total = quantity * price;

    this.props.mutate({
      variables: {
        id,
        name,
        description,
        quantity,
        price,
        total
      },
      refetchQueries: [
        {
          query: GetInvoices,
          variables: {
            skip: 0,
            limit: 5
          }
        }
      ]
    });
  }

  render() {
    return (
      <div
        id={`editInvoiceDetailModal-${this.props.data.id}`}
        className="modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">Edit Invoice Details</h4>
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
                  disabled={
                    !this.state.name ||
                    !this.state.description ||
                    !this.state.quantity ||
                    !this.state.price
                  }
                  data-dismiss="modal"
                  className="btn btn-large btn-success"
                  type="submit"
                  onClick={this.onInvoiceDetailSubmit.bind(this)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(graphql(mutation))(withRouter(EditInvoiceDetails));
