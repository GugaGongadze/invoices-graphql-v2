import React, { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import query from '../queries/CurrentUser';
import CreateInvoiceDetails from './CreateInvoiceDetails';
import mutation from '../mutations/DeleteInvoiceDetails';

import EditInvoiceDetails from './EditInvoiceDetails';

class InvoiceDetails extends Component {
  constructor(props) {
    super(props);

    this.deleteInvoiceDetailButtonRef = React.createRef();
  }

  onInvoiceDetailDelete() {
    const id = this.props.data.id;

    this.props
      .deleteInvoiceDetailMutation({
        variables: {
          id
        },
        refetchQueries: [
          {
            query
          }
        ]
      })
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
                  data-target="#editInvoiceModal"
                >
                  Edit
                </button>

                <EditInvoiceDetails data={this.props.data} />
              </td>
              <td>
                <button
                  data-dismiss="modal"
                  className="btn btn-large btn-danger"
                  onClick={this.onInvoiceDetailDelete.bind(this)}
                >
                  Delete
                </button>
              </td>
            </Fragment>
          )}
        </tr>
      </tbody>
    );
  }
}

export default compose(
  graphql(mutation, { name: 'deleteInvoiceDetailMutation' })
)(withRouter(InvoiceDetails));
