const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    content: {type: String, required: true },
    sender: {type: Schema.Types.ObjectId, ref: 'user'}, 
    roomId: {type: Schema.Types.ObjectId, ref: 'lobby'}
}, {timestamps: true})
const Message = model("message", messageSchema);

module.exports = Message;