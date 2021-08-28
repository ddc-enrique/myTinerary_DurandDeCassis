const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    profilePic: { type: String, required: true },
    country: { type: String, required: true },
    google: { type: Boolean, default: false },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;