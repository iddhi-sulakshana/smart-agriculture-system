import { Schema } from "mongoose";

// model for example model
export default new Schema({
    name: {
        type: String,
        required: true,
    },
});
