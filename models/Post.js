const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please provide description']
    },
    like: {
        type: Number
    },
    dislike: {
        type: Number
    },
    heart: {
        type: Number
    },
    comments: {
        type: [Object]
    },
    created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Post',PostSchema);