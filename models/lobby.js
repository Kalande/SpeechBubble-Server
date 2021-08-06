const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
    topic: {type: String, required: true },
    subject:{type: String, required: true }, 
    name: {type: String, unique: true, required: true },
    limit: Number,
    question: String,
    answer: String,
    users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    private: Boolean, 
    host:{ type: Schema.Types.ObjectId, ref: 'user'}
})
const Room = model("room", roomSchema);

module.exports = Room;
