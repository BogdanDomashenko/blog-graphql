const { User } = require("../models/models");

const users = [{ id: 1, username: "Vasya", age: 25 }];

exports.root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },
  createUser: async ({ input }) => {
    console.log({ input });
    const newUser = new User(input);
    const user = await newUser.save();
    console.log({ user });
    return user;
  },
};
