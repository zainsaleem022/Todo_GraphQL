import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      message
      user {
        user_id
        name
        email
      }
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      message
      user {
        user_id
        name
        email
      }
      token
    }
  }
`;
