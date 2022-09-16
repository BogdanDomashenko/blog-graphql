const { default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});
UserSchema.plugin(uniqueValidator);

exports.User = mongoose.model("User", UserSchema);
