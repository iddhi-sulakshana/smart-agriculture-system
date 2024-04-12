import mongoose from "mongoose";
import Joi from "joi-oid";
const { Schema, model } = mongoose;

const messageSchema = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Message = model("Message", messageSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    chatId: Joi.objectId().required(),
    senderId: Joi.objectId().required(),
    message: Joi.string().required(),
    timestamp: Joi.date(),
});
// function for validating the schema
function validate(message) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(message);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateMessage, Message };
