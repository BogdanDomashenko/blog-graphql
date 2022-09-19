import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($input: UserInput) {
    signup(input: $input) {
      id
      username
    }
  }
  query {
    signin {
      username
      password
    }
  }
`;
