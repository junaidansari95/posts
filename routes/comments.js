const express = require('express');
const router = express.Router();
const { getComment, addComment, deleteComment } = require('../controllers/commentController');
router
    .route('/')
    .get(getComment)
    .post(addComment);

router
    .route('/:id')
    .delete(deleteComment)

module.exports = router;