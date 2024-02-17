import Joi from "joi-oid";
import { model, Schema } from "mongoose";

// model for covers model
const coversSchema = new Schema({
    desktopCover: {
        type: String,
        required: true,
    },
    mobileCover: {
        type: String,
        required: true,
    },
});

// Creating a Mongoose model
const Cover = model("Cover", coversSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    desktopCover: Joi.string().required(),
    mobileCover: Joi.string().required(),
});
// function for validating the schema
function validate(cover) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(cover);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateCover, Cover };
