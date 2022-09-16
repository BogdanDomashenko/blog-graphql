const { default: mongoose, Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
UserSchema.plugin(uniqueValidator);

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

exports.User = mongoose.model("User", UserSchema);
exports.Post = mongoose.model("Post", PostSchema);
