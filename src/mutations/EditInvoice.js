import gql from 'graphql-tag';

export default gql`
  mutation EditInvoice(
    $id: ID!
    $name: String!
    $description: String
    $contactName: String
    $address: String
    $date: String!
  ) {
    editInvoice(
      id: $id
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
