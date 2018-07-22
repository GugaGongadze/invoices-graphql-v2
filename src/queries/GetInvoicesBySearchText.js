import gql from 'graphql-tag';

export default gql`
  query GetInvoicesBySearchTextQuery($searchText: String) {
    getInvoicesBySearchText(searchText: $searchText) {
      id
      userId
      name
      date
      created
      modified
      description
      contactName
      address
      invoiceDetails {
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
  }
`;
