import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';

import query from '../queries/GetInvoices';
import mutation from '../mutations/DeleteInvoiceDetails';

class InvoiceDetails extends Component {
  onInvoiceDetailDelete() {
    const id = this.props.data.id;

    this.props.mutate({
      variables: {
        id
      },
      refetchQueries: [
        {
          query,
          variables: {
            skip: 0,
            limit: 5
          }
        }
      ]
    });
  }

  render() {
    const {
      userId,
      name,
      description,
      quantity,
      price,
      total
    } = this.props.data;

    return (
      <Fragment>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{total}</td>

            {this.props.currentUser === userId && (
              <Fragment>
                <td>
                  <button
                    className="btn btn-large btn-warning"
                    data-toggle="modal"
                    data-target={`#editInvoiceDetailModal-${
                      this.props.data.id
                    }`}
                  >
                    <span
                      className="glyphicon glyphicon-pencil"
                      aria-hidden="true"
                    />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-large btn-danger"
                    onClick={this.onInvoiceDetailDelete.bind(this)}
                  >
                    <span
                      className="glyphicon glyphicon-remove"
                      aria-hidden="true"
                    />
                  </button>
                </td>
              </Fragment>
            )}
          </tr>
        </tbody>
      </Fragment>
    );
  }
}

export default graphql(mutation)(InvoiceDetails);
