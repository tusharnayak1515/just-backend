// Model for Post
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
        required: true
    },
    caption:{
        type: String,
        default: ""
    },
    location:{
        type: String,
        default: ""
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post',PostSchema);