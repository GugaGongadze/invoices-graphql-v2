import React, { Component } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { withRouter, Link } from 'react-router-dom';


const ClickableTr = styled.tr`
	cursor: pointer;
`;

class ClickableRow extends Component {
	onInvoiceClick(id, e) {
		this.props.history.push(`/details/${id}`);
	}

	render() {
		return (
			<tbody>
				{this.props.data.map(invoice => {
					return (
						<ClickableTr
							key={invoice.id}
							onClick={e => this.onInvoiceClick(invoice.id, e)}
						>
							<td>{invoice.name}</td>
							<td>{format(invoice.created, 'DD/MM/YYYY')}</td>
							<td>{format(invoice.date, 'DD/MM/YYYY')}</td>
							<td>{invoice.description}</td>
							<td>{invoice.contactName}</td>
							<td>{invoice.address}</td>
						</ClickableTr>
					);
				})}
			</tbody>
		);
	}
}

export default withRouter(ClickableRow);
