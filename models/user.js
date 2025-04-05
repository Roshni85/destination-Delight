const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: String,
  email: String,
  profilePic: String,
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;