const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required :true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    createdOn: {
        type: String
    },
    updatedOn: {
        type: String
    }
})


module.exports = mongoose.model('user', UserSchema)