import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import mutation from '../mutations/EditInvoice';
import getInvoicesQuery from '../queries/GetInvoices';

class EditInvoice extends Component {
  state = {
    name: this.props.data.name,
    description: this.props.data.description,
    date: this.props.data.date,
    address: this.props.data.address,
    contactName: this.props.data.contactName
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onInvoiceEdit(e) {
    e.preventDefault();
    const { id } = this.props.data;
    const { name, description, date, contactName, address } = this.state;

    this.props.mutate({
      variables: {
        id,
        name,
        description,
        date,
        contactName,
        address
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
    if (this.props.data.loading) return <div />;

    return (
      <div
        id={`editInvoiceModal-${this.props.index}`}
        className="modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">Edit Invoice</h4>
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
                  type="submit"
                  data-dismiss="modal"
                  className="btn btn-large btn-success"
                  onClick={this.onInvoiceEdit.bind(this)}
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

export default compose(graphql(mutation))(EditInvoice);
