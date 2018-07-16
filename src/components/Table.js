import React from 'react';
import InvoiceRow from './InvoiceRow';

const Table = props => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Due Date</th>
            <th>Description</th>
            <th>Contact Name</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <InvoiceRow
          handleInvoiceDelete={props.handleInvoiceDelete}
          userId={props.userId}
          data={props.data}
        />
      </table>
    </div>
  );
};

export default Table;
