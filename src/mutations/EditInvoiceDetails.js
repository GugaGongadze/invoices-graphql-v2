import gql from 'graphql-tag';

export default gql`
  mutation EditInvoice(
    $id: ID!
    $name: String!
    $description: String
    $quantity: Int
    $price: Float
    $total: Float
  ) {
    editInvoiceDetails(
      id: $id
      name: $name
      description: $description
      quantity: $quantity
      price: $price
      total: $total
    ) {
      name
    }
  }
`;
