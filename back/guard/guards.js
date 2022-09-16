const { shield } = require("graphql-shield");

exports.permissions = shield({
  Query: {},
  Mutation: {},
});
