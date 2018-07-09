import gql from 'graphql-tag';

export default gql`
  query GetInvoicesByUserId($userId: ID!) {
    getInvoicesByUserId(userId: $userId) {
      id
      name
      date
      created
      modified
      description
      contactName
      address
    }
  }
`;
