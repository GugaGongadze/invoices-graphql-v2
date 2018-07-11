import gql from 'graphql-tag';

export default gql`
  {
    currentUser {
      id
      username
      email
      invoices {
        id
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
  }
`;
