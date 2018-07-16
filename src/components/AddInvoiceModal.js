import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';

import createInvoiceMutation from '../mutations/CreateInvoice';

class AddInvoiceModal extends Component {
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

  onInvoiceSubmit = () => {
    const { userId } = this.props;
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
        }
      }).then(() => this.props.handleInvoiceCreate())
  }

  render() {
    return (
      <div id="newInvoiceModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">Add New Invoice</h4>
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
                  onClick={this.onInvoiceSubmit}
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

export default graphql(createInvoiceMutation)(withRouter(AddInvoiceModal));
