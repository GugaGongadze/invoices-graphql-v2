import gql from 'graphql-tag';

export default gql`
	mutation DeleteInvoiceDetails($id: ID!) {
		deleteInvoiceDetails(id: $id) {
			description
		}
	}
`;
