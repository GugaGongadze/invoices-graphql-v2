import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import query from '../queries/GetInvoiceById';
import mutation from '../mutations/EditInvoice';
import getInvoicesQuery from '../queries/GetInvoices';


import Navbar from './Navbar';

const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const Container = styled.div`
	height: 100vh;
`;

class EditInvoice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.data.getInvoiceById
				? this.props.data.getInvoiceById.name
				: '',
			description: this.props.data.getInvoiceById
				? this.props.data.getInvoiceById.description
				: '',
			date: this.props.data.getInvoiceById
				? this.props.data.getInvoiceById.date
				: '',
			address: this.props.data.getInvoiceById
				? this.props.data.getInvoiceById.address
				: '',
			contactName: this.props.data.getInvoiceById
				? this.props.data.getInvoiceById.contactName
				: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.data.loading) {
			this.setState({
				name: nextProps.data.getInvoiceById.name,
				description: nextProps.data.getInvoiceById.description,
				date: nextProps.data.getInvoiceById.date,
				address: nextProps.data.getInvoiceById.address,
				contactName: nextProps.data.getInvoiceById.contactName
			});
		}
	}

	onInvoiceSubmit(e) {
		e.preventDefault();
		const { id } = this.props.match.params;
		const { name, description, date, contactName, address } = this.state;

		this.props.mutate({
			variables: {
				id,
				name,
				description,
				date,
				contactName,
				address
			},
			refetchQueries: [{ query: getInvoicesQuery }]
		}).then(() => this.props.history.push('/dashboard'))
	}

	render() {
		if (this.props.data.loading) return <div />;

		return (
			<div>
				<Navbar />
				<Container className="container">
					<Row className="row">
						<div className="col-xs-6">
							<form className="jumbotron">
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input
										type="text"
										name="name"
										className="form-control"
										placeholder="Invoice name"
										value={this.state.name || ''}
										onChange={e =>
											this.setState({
												name: e.target.value
											})
										}
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="description">
										Description
									</label>
									<input
										type="text"
										name="description"
										className="form-control"
										placeholder="Description"
										value={this.state.description || ''}
										onChange={e =>
											this.setState({
												description: e.target.value
											})
										}
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="date">Due Date</label>
									<input
										type="date"
										name="name"
										className="form-control"
										placeholder="Due Date"
										value={this.state.date || ''}
										onChange={e =>
											this.setState({
												date: e.target.value
											})
										}
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="contactName">
										Contact Name
									</label>
									<input
										type="text"
										name="contactName"
										className="form-control"
										placeholder="Contact Name"
										value={this.state.contactName || ''}
										onChange={e =>
											this.setState({
												contactName: e.target.value
											})
										}
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="address">Address</label>
									<input
										type="text"
										name="address"
										className="form-control"
										placeholder="Contact Name"
										value={this.state.address || ''}
										onChange={e =>
											this.setState({
												address: e.target.value
											})
										}
										required
									/>
								</div>
								<button
									type="submit"
									className="btn btn-large btn-success"
									onClick={this.onInvoiceSubmit.bind(this)}
								>
									Submit
								</button>
							</form>
						</div>
					</Row>
				</Container>
			</div>
		);
	}
}

export default compose(
	graphql(query, {
		options: props => {
			console.log(props);
			return { variables: { id: props.match.params.id } };
		}
	}),
	graphql(mutation)
)(withRouter(EditInvoice))
