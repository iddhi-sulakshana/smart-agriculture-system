import Joi from "joi";
import { Schema, model } from "mongoose";

// Schema for the user collection
const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // role can be either farmer or wholesaler mongoose mathces the role with the enum values
    role: {
        type: String,
        required: true,
        enum: ["farmer", "wholesaler"],
    },
});

// create a model for the user schema
const Users = model("Users", usersSchema);

// create a Joi validation schema
const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("farmer", "wholesaler").required(),
});

// function for validating the schema
function validate(user) {
    // validate the provided object against the Joi schema
    const result = schema.validate(user);
    // if there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // if validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateUser, Users };
