import Joi from "joi-oid";
import { model, Schema } from "mongoose";

// model for order model
const orderSchema = new Schema({
    paymentId: {
        type: String,
        required: true,
    },
    cropId: {
        type: Schema.Types.ObjectId,
        ref: "Crop",
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shippingDetails: {
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postal: {
            type: String,
            required: true,
        },
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        required: true,
        enum: ["paypal", "bank", "payhere"],
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
    },
    hash: {
        type: String,
    },
});

// Creating a Mongoose model
const Order = model("Order", orderSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.objectId(),
    paymentId: Joi.string().required(),
    cropId: Joi.objectId().required(),
    buyer: Joi.objectId().required(),
    shippingDetails: Joi.object({
        address: Joi.string().required(),
        phone: Joi.string().required(),
        name: Joi.string().required(),
    }),
    quantity: Joi.number().required(),
    total: Joi.number().required(),
    method: Joi.string().valid("paypal", "bank").required(),
    isPaid: Joi.boolean(),
});
// function for validating the schema
function validate(order) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(order);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateOrder, Order };
