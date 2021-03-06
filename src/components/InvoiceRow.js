import React, { Component, Fragment } from 'react';
import format from 'date-fns/format';
import { graphql } from 'react-apollo';

import mutation from '../mutations/DeleteInvoice';

import EditInvoiceModal from './EditInvoiceModal';
import InvoiceDetailsModal from './InvoiceDetailsModal';

class InvoiceRow extends Component {
  onInvoiceDelete = (e, id) => {
    this.props
      .mutate({
        variables: {
          id
        }
      })
      .then(() => this.props.handleInvoiceDelete());
  };

  render() {
    return (
      <tbody>
        {this.props.data.map((invoice, i) => {
          return (
            <Fragment key={invoice.id}>
              <tr style={{cursor: 'pointer'}} data-index={`inv-${i}`}>
                <td
                  data-toggle="modal"
                  data-target={`#invoiceDetailsModal-${i}`}
                >
                  {invoice.name}
                </td>
                <td
                  data-toggle="modal"
                  data-target={`#invoiceDetailsModal-${i}`}
                >
                  {format(invoice.created, 'DD/MM/YYYY')}
                </td>
                <td
                  data-toggle="modal"
                  data-target={`#invoiceDetailsModal-${i}`}
                >
                  {format(invoice.date, 'DD/MM/YYYY')}
                </td>
                <td
                  data-toggle="modal"
                  data-target={`#invoiceDetailsModal-${i}`}
                >
                  {invoice.description}
                </td>
                <td
                  data-toggle="modal"
                  data-target={`#invoiceDetailsModal-${i}`}
                >
                  {invoice.contactName}
                </td>
                <td
                  data-toggle="modal"
                  data-target={`#invoiceDetailsModal-${i}`}
                >
                  {invoice.address}
                </td>
                {invoice.userId === this.props.userId && (
                  <Fragment>
                    <td>
                      <button
                        className="btn btn-large btn-warning"
                        data-toggle="modal"
                        data-target={`#editInvoiceModal-${i}`}
                      >
                        <span
                          className="glyphicon glyphicon-pencil"
                          aria-hidden="true"
                        />
                      </button>

                      <EditInvoiceModal index={i} data={invoice} />
                    </td>
                    <td>
                      <button
                        className="btn btn-large btn-danger"
                        onClick={e => this.onInvoiceDelete(e, invoice.id)}
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
              <InvoiceDetailsModal
                invoiceUser={invoice.userId}
                invoiceId={invoice.id}
                userId={this.props.userId}
                index={i}
                invoiceDetails={invoice.invoiceDetails}
              />
            </Fragment>
          );
        })}
      </tbody>
    );
  }
}

export default graphql(mutation)(InvoiceRow);
