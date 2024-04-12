import { model, Schema } from "mongoose";

// model for chat model
const chatSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Creating a Mongoose model
const Chat = model("Chat", chatSchema);

export default Chat;
