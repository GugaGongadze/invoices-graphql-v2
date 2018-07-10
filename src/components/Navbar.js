import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Logout';

class Navbar extends Component {
	onLogoutClick() {
		this.props.mutate({}).then(() => {
			this.props.history.push('/login');
		});
	}

	onCreateInvoiceClick() {
		this.props.history.push('/invoice/new');
	}

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">
							Invoices
						</Link>
					</div>
					<div>
						<ul className="nav navbar-nav navbar-right">
							<li>
								<button
									className="btn btn-large btn-success"
									onClick={this.onCreateInvoiceClick.bind(
										this
									)}
								>
									Create New Invoice
								</button>
							</li>
							<li>
								<button
									className="btn btn-large btn-warning"
									onClick={this.onLogoutClick.bind(this)}
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default graphql(mutation)(withRouter(Navbar));
