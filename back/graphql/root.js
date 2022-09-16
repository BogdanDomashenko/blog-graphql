const { User } = require("../models/models");
const { UserService } = require("../services/User.service");

const users = [{ id: 1, username: "Vasya", age: 25 }];

exports.root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },
  signup: async ({ input }) => {
    return await UserService.signup(input.username, input.password);
  },
  signin: async ({ input }) => {
    return await UserService.signin(input.username, input.password);
  },
};
