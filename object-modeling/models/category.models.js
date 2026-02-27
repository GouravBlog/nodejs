import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    uuid: {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });


let category = mongoose.model("category", categorySchema);

export default category;