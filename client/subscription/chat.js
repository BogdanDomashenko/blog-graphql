const CHAT_SUBSCRIPTION = gql`
  subscription OnMessageAdded($messageId: ID!) {
    commentAdded(postID: $postID) {
      id
      author
      text
    }
  }
`;
