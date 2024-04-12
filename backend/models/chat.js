import { model, Schema } from "mongoose";

// model for chat model
const chatSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    },
});

// Creating a Mongoose model
const Chat = model("Chat", chatSchema);

export default Chat;
