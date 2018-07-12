import gql from 'graphql-tag';

export default gql`
  mutation Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      username
    }
  }
`;
