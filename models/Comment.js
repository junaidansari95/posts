const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide text']
    },
    post_id: {
        type: String,
        required: [true, 'Please provide post_id']
    },
    created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Comment',CommentSchema);