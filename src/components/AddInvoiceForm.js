import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import GetInvoices from '../queries/GetInvoices';
import createInvoiceMutation from '../mutations/CreateInvoice';

class AddInvoiceForm extends Component {
  state = {
    name: '',
    description: '',
    date: '',
    contactName: '',
    address: ''
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onInvoiceSubmit(event) {
    event.preventDefault();

    const { userId } = this.props;
    const { name, description, date, contactName, address } = this.state;

    this.props.mutate({
      variables: {
        userId,
        name,
        description,
        date,
        contactName,
        address
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
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Invoice name"
            value={this.state.name || ''}
            onChange={this.handleInputChange.bind(this)}
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
            onChange={this.handleInputChange.bind(this)}
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
            onChange={this.handleInputChange.bind(this)}
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
            onChange={this.handleInputChange.bind(this)}
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
            onChange={this.handleInputChange.bind(this)}
            required
          />
        </div>
        <button
          disabled={
            !this.state.name ||
            !this.state.description ||
            !this.state.date ||
            !this.state.contactName ||
            !this.state.address
          }
          data-dismiss="modal"
          type="submit"
          className="btn btn-large btn-success"
          onClick={this.onInvoiceSubmit.bind(this)}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default graphql(createInvoiceMutation)(AddInvoiceForm);
