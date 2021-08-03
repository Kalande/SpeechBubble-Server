const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {type: String, required: true },
    description: String,
    joined: {type: Date, default: new Date()}
})
const User = model("user", userSchema);

module.exports = User;