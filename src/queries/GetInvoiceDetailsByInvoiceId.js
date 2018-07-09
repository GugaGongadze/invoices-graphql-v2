import gql from 'graphql-tag';

export default gql`
	query GetInvoiceDetailsByInvoiceId($invoiceId: ID!) {
		getInvoiceDetailsByInvoiceId(invoiceId: $invoiceId) {
            id
            userId
            invoiceId
            name
            description
            quantity
            price
            total
		}
	}
`;