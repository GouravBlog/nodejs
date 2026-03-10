const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    }
});


const contacts = mongoose.model("conatct", userSchema);

module.exports = contacts;