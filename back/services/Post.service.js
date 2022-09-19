const { Post } = require("../models/models");

exports.PostService = {
  async create(userId, title, content) {
    const post = new Post({ title, content, author: userId });
    return post.save();
  },
  async getAll() {
    const posts = await Post.find().populate("author");

    return posts;
  },
};
