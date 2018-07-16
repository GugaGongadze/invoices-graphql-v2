import React from 'react';

const Errors = props => {
	return props.errors.map(error => (
		<div
			className="alert alert-danger alert-dismissible fade in"
			key="error"
		>
			<button
				className="close"
				data-dismiss="alert"
				aria-label="close"
			>
				&times;
			</button>
			{error}
		</div>
	));
};

export default Errors;
