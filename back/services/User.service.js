const bcrypt = require("bcrypt");
const { User } = require("../models/models");

exports.UserService = {
  async signup(username, password) {
    const hash = await bcrypt.hash(password, 3);
    const user = new User({ username, hash });
    return await user.save();
  },
  async signin(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }
    if (!(await bcrypt.compare(password, user.hash))) {
      throw new Error("Invalid password");
    }

    return user;
  },
};
