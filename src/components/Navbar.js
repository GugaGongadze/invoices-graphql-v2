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
								<Link
									to="/invoice/new"
									className="btn btn-large btn-success"
								>
									Create New Invoice
								</Link>
							</li>
							<li>
								<a
									className="btn btn-large btn-warning"
									onClick={this.onLogoutClick.bind(this)}
								>
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default graphql(mutation)(withRouter(Navbar));
