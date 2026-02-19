import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("please valid email id");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    number: {
        type: Number,
        required: true
    }
}, { timestamps: true });

let user = mongoose.model("user", userSchema);


export default user;