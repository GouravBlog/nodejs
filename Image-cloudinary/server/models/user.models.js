import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
});


const user = mongoose.model("user", userSchema);

export default user;