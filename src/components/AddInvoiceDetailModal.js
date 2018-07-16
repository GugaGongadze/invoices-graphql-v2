import React from 'react';
import AddInvoiceDetailForm from './AddInvoiceDetailForm';

const AddInvoiceDetailModal = props => {
  return (
    <div
      id={`addInvoiceDetailModal-${props.index}`}
      className="modal fade"
      role="dialog"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h4 className="modal-title">Add Invoice Details</h4>
          </div>
          <div className="modal-body">
            <AddInvoiceDetailForm
              userId={props.userId}
              invoiceId={props.invoiceId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoiceDetailModal;
