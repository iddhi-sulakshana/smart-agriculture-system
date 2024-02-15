import Joi from "joi-oid";
import { model, Schema } from "mongoose";

// model for information model
const informationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "seeds",
            "fertilizers",
            "practices.mechanization",
            "practices.postharvest",
            "regulation",
            "storage",
        ],
    },
});

// Creating a Mongoose model
const Information = model("Information", informationSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    title: Joi.string().required(),
    src: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string(),
    category: Joi.string()
        .valid(
            "seeds",
            "fertilizers",
            "practices.mechanization",
            "practices.postharvest",
            "regulation",
            "storage"
        )
        .required(),
});
// function for validating the schema
function validate(information) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(information);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateInformation, Information };
