import gql from 'graphql-tag';

export default gql`
  mutation Signup($username: String!, $email: String, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      username
    }
  }
`;
