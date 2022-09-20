const CHAT_SUBSCRIPTION = gql`
  subscription OnMessageAdded($messageId: ID!) {
    messageAdded(postID: $postID) {
      id
      author
      text
    }
  }
`;
