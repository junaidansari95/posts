const Post = require('../models/Post')

// @desc Get Posts
// @route GET /api/v1/posts
// @access public
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc Add Post
// @route POST /api/v1/posts
// @access public
exports.addPost = async (req, res, next) => {
    try {
        const { description } = req.body;
        const post = await Post.create(req.body);
        return res.status(201).json({
            success: true,
            data: post
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
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

// @desc Delete Post
// @route DELETE /api/v1/posts/:id
// @access public
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post not found'
            });
        }
        await post.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })
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
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(req);
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post not found'
            });
        }
        const updated_post = await Post.findByIdAndUpdate(req.params.id, req.body, { safe: true, upsert: true });
        return res.status(200).json({
            success: true,
            data: updated_post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}