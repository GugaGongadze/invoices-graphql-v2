import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import getInvoicesQuery from '../queries/GetInvoices';
import mutation from '../mutations/CreateInvoiceDetails';

class AddInvoiceDetailForm extends Component {
  state = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    total: 0
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onInvoiceDetailSubmit = (e) => {
    e.preventDefault();

    const { userId, invoiceId } = this.props;
    const { name, description, quantity, price } = this.state;
    const total = quantity * price;

    this.props.mutate({
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
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange.bind(this)}
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
            onChange={this.handleInputChange.bind(this)}
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
            onChange={this.handleInputChange.bind(this)}
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
            onChange={this.handleInputChange.bind(this)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="total"
            className="form-control"
            placeholder="Total"
            value={this.state.quantity * this.state.price}
            onChange={this.handleInputChange.bind(this)}
            disabled
            required
          />
        </div>
        <button
          disabled={!this.state.name || !this.state.description || !this.state.quantity || !this.state.price}
          data-dismiss="modal"
          className="btn btn-large btn-success"
          type="submit"
          onClick={this.onInvoiceDetailSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default graphql(mutation)(AddInvoiceDetailForm);
