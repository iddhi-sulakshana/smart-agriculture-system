import Joi from "joi-oid";
import { model, Schema } from "mongoose";

// model for location model
const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

// Creating a Mongoose model
const Location = model("Location", locationSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().required(),
});
// function for validating the schema
function validate(location) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(location);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateLocation, Location };
