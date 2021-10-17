// Model for User
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilepic:{
        type: String
    },
    followers:{
        type: Array
    },
    posts:{
        type: Array
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;