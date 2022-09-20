const { User } = require("../models/models");
const { JwtService } = require("../services/Jwt.service");
const { PostService } = require("../services/Post.service");
const { UserService } = require("../services/User.service");
const { MessageService } = require("../services/Message.service");
const pubsub = require("../helpers/pubsub");

const NEW_MESSAGE_EVENT = "NEW_MESSAGE_EVENT";

exports.root = {
  signup: async ({ input }) => {
    return await UserService.signup(input.username, input.password);
  },
  signin: async ({ input }) => {
    const user = await UserService.signin(input.username, input.password);
    const data = { id: user._id, username: user.username };

    const token = JwtService.generateAccessToken(data);
    return { ...data, token };
  },
};

exports.resolvers = {
  Query: {
    getAllPosts: async (parent, args, context) => {
      const posts = await PostService.getAll();
      return posts;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      return await UserService.signup(input.username, input.password);
    },
    signin: async (_, { input }) => {
      const user = await UserService.signin(input.username, input.password);
      const data = { id: user._id, username: user.username };

      const token = JwtService.generateAccessToken(data);
      return { ...data, token };
    },
    createPost: async (_, { input }, context) => {
      const { user } = context;

      if (!user) {
        throw new Error("Unautorized");
      }

      const post = await PostService.create(
        user.id,
        input.title,
        input.content
      );
      return post;
    },
    addMessage: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error("Unautorized");
      }

      const message = await MessageService.create(user.id, input.text);

      pubsub.publish(NEW_MESSAGE_EVENT, { messageAdded: message });

      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE_EVENT),
    },
  },
};
