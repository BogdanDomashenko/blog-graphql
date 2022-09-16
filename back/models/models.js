const { default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
});
UserSchema.plugin(uniqueValidator);

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

exports.User = mongoose.model("User", UserSchema);
