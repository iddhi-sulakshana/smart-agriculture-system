import { Schema } from "mongoose";

// model for user model
export default new Schema({
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
