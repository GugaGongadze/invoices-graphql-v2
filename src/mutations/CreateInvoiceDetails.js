import gql from 'graphql-tag';

export default gql`
	mutation CreateInvoiceDetails($userId: ID!, $invoiceId: ID!, $name: String!, $description: String, $quantity: Int, $price: Float, $total: Float){
        createInvoiceDetails(userId: $userId, invoiceId: $invoiceId, name: $name, description: $description, quantity: $quantity, price: $price, total: $total) {
	    name
	  }
	}
`;