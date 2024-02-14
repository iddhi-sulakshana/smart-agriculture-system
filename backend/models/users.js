import Joi from "joi-oid";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

// Schema for the user collection
const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
        default: `https://robohash.org/set_set5/bgset_bg1/${Math.random()}?size=100x100`,
    },
});

// generate auth token function for the user schema
usersSchema.methods.generateAuthToken = function () {
    // generate a token using the user id and the secret key
    const token = jwt.sign(
        { _id: this._id, role: this.role },
        process.env.JWT_PRIVATE_KEY
    );
    return token;
};

// create a model for the user schema
const Users = model("Users", usersSchema);

// create a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("farmer", "wholesaler").required(),
    phone: Joi.string(),
    address: Joi.string(),
    avatar: Joi.string(),
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
