import gql from 'graphql-tag';

export default gql`
  query InvoicesQuery($skip: Int, $limit: Int) {
    getInvoices(skip: $skip, limit: $limit) {
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
