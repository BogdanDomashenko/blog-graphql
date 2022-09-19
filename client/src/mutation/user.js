import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($input: UserInput) {
    signup(input: $input) {
      id
      username
    }
  }
`;

export const SIGNIN = gql`
  mutation signin($input: UserInput) {
    signin(input: $input) {
      id
      username
      token
    }
  }
`;
