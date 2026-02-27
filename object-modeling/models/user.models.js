import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mob: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["super_admin", "admin", "user", "driver", "store-manager"]
    }
}, { timestamps: true });


let user = mongoose.model("user", userSchema);

export default user;