import { gql } from "@apollo/client";

export const GET_ALL_MESSAGES = gql`
  query {
    getAllMessages {
      id
      text
      author {
        id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($input: MessageInput) {
    addMessage(input: $input) {
      text
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageAdded {
      id
      text
      author {
        id
        username
      }
    }
  }
`;
