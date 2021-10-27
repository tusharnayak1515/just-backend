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
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    followers:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    following:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'post',
        }
    ],
    about:{
        profilepic:{
            type: String,
            default: null
        },
        bio:{
            type: String,
            default: ""
        }
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;