const { buildSchema } = require("graphql");

exports.grapqlSchema = buildSchema(`
  type User {
    id: ID
    username: String
    password: String!
    posts: [Post]
  }

  type Post {
    id: ID
    title: String
    content: String
    author: User
  }

  type Message {
    id: ID
    text: String
    author: User
  }

  input UserInput {
    id: ID
    username: String!
    password: String!
  }

  input PostInput {
    id: ID
    title: String!
    content: String!
  }

  input MessageInput {
    id: ID
    text: String!
  }

  type SigninOutput {
    id: ID
    username: String
    token: String
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
    getAllPosts: [Post]
    getAllMessages: [Message]
  }

  type Mutation {
    signin(input: UserInput): SigninOutput
    signup(input: UserInput): User
    createPost(input: PostInput): Post
    addMessage(input: MessageInput): Message
  }

  type Subscription {
    messageAdded: Message
  }
`);
