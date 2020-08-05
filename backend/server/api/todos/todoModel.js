const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoScema =  new Schema({
    name : {
        type : String
    },
    description : {
        type : String
    },
    createdBy : {
        type : String
    },
    updatedOn: {
        type: Date
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('todo', todoScema)