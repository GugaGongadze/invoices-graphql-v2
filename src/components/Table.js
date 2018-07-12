import React, { Component } from 'react';
import ClickableRow from './ClickableRow';

class Table extends Component {
  render() {
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

          <ClickableRow userId={this.props.userId} data={this.props.data} />
        </table>
      </div>
    );
  }
}

export default Table;
