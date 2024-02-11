import Joi from "joi";
import { model, Schema } from "mongoose";

// model for category model
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

// Creating a Mongoose model
const Category = model("Category", categorySchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().required(),
});
// function for validating the schema
function validate(category) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(category);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateCategory, Category };
