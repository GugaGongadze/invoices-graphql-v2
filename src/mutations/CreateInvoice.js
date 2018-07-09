import gql from 'graphql-tag';

export default gql`
  mutation CreateInvoice(
    $userId: ID!
    $name: String!
    $description: String
    $contactName: String
    $address: String
    $date: String!
  ) {
    createInvoice(
      userId: $userId
      name: $name
      description: $description
      contactName: $contactName
      address: $address
      date: $date
    ) {
      name
    }
  }
`;
