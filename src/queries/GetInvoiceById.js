import gql from 'graphql-tag';

export default gql`
	query GetInvoiceById($id: ID!) {
		getInvoiceById(id: $id) {
			name
			date
			contactName
            description
            address
		}
	}
`;
