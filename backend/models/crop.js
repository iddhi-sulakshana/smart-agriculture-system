import Joi from "joi-oid";
import { model, Schema } from "mongoose";

// model for Crops model
const cropSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Location",
    },
    unit: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
        enum: ["new", "bestseller", "trending"],
    },
    isSold: {
        type: Boolean,
        required: true,
    },
});

// Creating a Mongoose model
const Crop = model("Crop", cropSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    title: Joi.string().required(),
    user: Joi.objectId().required(),
    category: Joi.objectId().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    image: Joi.string().required(),
    date: Joi.date(),
    location: Joi.objectId().required(),
    unit: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    isSold: Joi.boolean().required(),
});
// function for validating the schema
function validate(crop) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(crop);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateCrop, Crop };
