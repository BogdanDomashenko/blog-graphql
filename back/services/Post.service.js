const { Post } = require("../models/models");

exports.PostService = {
  async create(userId, title, content) {
    const post = new Post({ title, content, author: userId });
    return post.save();
  },
};
