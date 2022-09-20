const { Message } = require("../models/models");

exports.MessageService = {
  async create(userId, text) {
    const message = new Message({ text, author: userId });
    return (await message.save()).populate("author");
  },
  async getAll() {
    const messages = await Message.find().populate("author");

    return messages;
  },
};
