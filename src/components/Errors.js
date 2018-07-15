import React from 'react';

const Errors = props => {
	return props.errors.map(error => (
		<div
			className="alert alert-danger alert-dismissible fade in"
			key="error"
		>
			<a
				href="#"
				className="close"
				data-dismiss="alert"
				aria-label="close"
			>
				&times;
			</a>
			{error}
		</div>
	));
};

export default Errors;
