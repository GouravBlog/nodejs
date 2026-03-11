const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

userSchema.plugin(mongoosePaginate);

const contacts = mongoose.model("conatct", userSchema);

module.exports = contacts;