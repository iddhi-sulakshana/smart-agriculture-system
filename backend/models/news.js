import Joi from "joi-oid";
import { model, Schema } from "mongoose";

// model for news model
const newsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Creating a Mongoose model
const News = model("News", newsSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date(),
});
// function for validating the schema
function validate(news) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(news);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateNews, News };
