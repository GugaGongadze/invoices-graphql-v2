import React from 'react';
import AddInvoiceForm from './AddInvoiceForm';

const AddInvoiceModal = props => {
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
            <AddInvoiceForm userId={props.userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
