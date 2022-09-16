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

  type SigninOutput {
    id: ID
    username: String
    token: String
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
    getAllPosts: [Post]
  }

  type Mutation {
    signup(input: UserInput): User
    signin(input: UserInput): SigninOutput
  }
`);
