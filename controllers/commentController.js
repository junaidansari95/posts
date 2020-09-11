const Comment = require('../models/Comment');
const Post = require('../models/Post');

// @desc Get Posts
// @route GET /api/v1/posts
// @access public
exports.getComment = async (req, res, next) => {
    try {
        const comment = await Comment.find();
        return res.status(200).json({
            success: true,
            data: comment
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc Add Comment
// @route POST /api/v1/comment
// @access public
exports.addComment = async (req, res, next) => {
    try {
        const { text, post_id } = req.body;
        const comment = await Comment.create(req.body);
        const commentIndex = { post_id: post_id, comment_id: comment.id, text: text };
        await Post.findByIdAndUpdate(post_id, { $push: { comments: commentIndex } }, { safe: true, upsert: true });
        return res.status(200).json({
            success: true,
            data: commentIndex
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map( val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}

// @desc Delete Comment
// @route DELETE /api/v1/comment/:id
// @access public
exports.deleteComment = async (req, res, next) => {
    try {
        const commentIndex = await Comment.findById(req.params.id);
        if (!commentIndex) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found'
            });
        }
        else{
            const commentToBeDeleted = { text: commentIndex.text, post_id: commentIndex.post_id, comment_id: req.params.id }
            await Post.findByIdAndUpdate(commentIndex.post_id,
                {$pull: {comments: commentToBeDeleted}},
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                    console.log(err);
                    }else{
                        return res.status(200).json({
                            success: true,
                            message: commentToBeDeleted
                        })
                    }
                }
            );
            await commentIndex.remove();
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc Update Post
// @route PUT /api/v1/posts/:id
// @access public
// exports.updatePost = async (req, res, next) => {
//     res.send('PUT PosT')
// }