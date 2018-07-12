import React from 'react';

const AddInvoiceButton = () => {
  return (
    <button className="btn btn-info" data-toggle="modal" data-target="#newInvoiceModal">
      <span className="glyphicon glyphicon-plus" aria-hidden="true" />
    </button>
  );
};

export default AddInvoiceButton;
