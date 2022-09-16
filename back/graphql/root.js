const { User } = require("../models/models");
const { JwtService } = require("../services/Jwt.service");
const { UserService } = require("../services/User.service");

const users = [{ id: 1, username: "Vasya", age: 25 }];

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
    getAllPosts: (parent, args, context) => {
      console.log(context.user);
      return [{ id: 1, title: "Hello World", content: "Hello World1" }];
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
  },
};
