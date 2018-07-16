import React, { Fragment } from 'react';
import InvoiceDetails from './InvoiceDetails';
import AddInvoiceDetailModal from './AddInvoiceDetailModal';
import EditInvoiceDetails from './EditInvoiceDetails';

const InvoiceDetailsModal = props => {
  return (
    <tr>
      <td style={{ padding: 0, borderTop: 'none' }}>
        <div
          id={`invoiceDetailsModal-${props.index}`}
          className="modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
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
                    {props.invoiceDetails &&
                      props.invoiceDetails.map((invoiceDetail, i) => {
                        return (
                          <Fragment key={invoiceDetail.id}>
                            <InvoiceDetails
                              data={invoiceDetail}
                              currentUser={props.userId}
                              index={props.index}
                            />
                            <EditInvoiceDetails
                              invoiceid={props.index}
                              data={invoiceDetail}
                            />
                          </Fragment>
                        );
                      })}
                  </table>
                </div>
                {props.userId === props.invoiceUser && (
                  <button
                    className="btn btn-info"
                    data-toggle="modal"
                    data-target={`#addInvoiceDetailModal-${props.index}`}
                  >
                    <span
                      className="glyphicon glyphicon-plus"
                      aria-hidden="true"
                    />
                  </button>
                )}
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
        <AddInvoiceDetailModal
          userId={props.userId}
          invoiceId={props.invoiceId}
          index={props.index}
        />
      </td>
    </tr>
  );
};

export default InvoiceDetailsModal;
