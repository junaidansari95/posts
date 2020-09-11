/*eslint-disable*/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, Button, IconButton } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getPosts, addPosts } from "../Actions/postActions";
import { addComment } from "../Actions/commentAction";
export default () => {
    const [like, setLike] = React.useState(false);
    const [dislike, setDislike] = React.useState(false);
    const [heart, setHeart] = React.useState(false);
    const [post, setPost] = React.useState('');
    const [comment, setComment] = React.useState('');
    const handlePostSubmit = event => {
        dispatch(addPosts({description: post}))
    }
    const handleCommentSubmit = (id) => {
        dispatch(addComment({
            post_id: id,
            text: comment
        }))
    }
    const handleLike = () =>{
        if(like === false && dislike === true){
            setDislike(!dislike)
        }
        setLike(!like)
    }
    const handleDisLike = () =>{
        if(dislike === false && like === true){
            setLike(!like)
        }
        setDislike(!dislike)
    }
    const dispatch = useDispatch();
    let { all_posts } = useSelector(state => state.posts);
    React.useEffect(() => { dispatch(getPosts()) }, []);
    return (
        <Box style={{ maxWidth: 600, margin:'auto' }}>
            <Typography variant="h3" gutterBottom>What's on your mind?</Typography>
            <TextField
                label="enter your thoughts"
                multiline
                rows={4}
                variant="outlined"
                onChange={(e)=>setPost(e.target.value)}
                style={{ width: '100%', marginBottom: 15 }}
            />
            <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={handlePostSubmit}>Add Post</Button>
            <Box style={{ background: 'hsl(0deg 15% 82% / 61%)', borderRadius: 10, marginTop: 10, padding: 10 }}>
                {
                    (undefined !== all_posts && all_posts.length) ? all_posts.map(post => {
                        return <Box key={post._id} style={{ background: 'rgb(154 154 154 / 40%)', borderRadius: 5, padding: 10, margin:10 }}>
                            <Typography variant="h5" gutterBottom>{post.description}</Typography>
                            <Box style={{display:'flex'}}>
                                <IconButton color={like ? "primary" : "disable"} onClick={handleLike}>
                                        <ThumbUpAltIcon />
                                    </IconButton>
                                <IconButton color={ dislike ? "primary" : "disable"} onClick={handleDisLike}>
                                        <ThumbDownIcon />
                                    </IconButton>
                                <IconButton color={ heart ? "primary" : "disable"} onClick={() => setHeart(!heart)}>
                                        <FavoriteIcon />
                                    </IconButton>
                            </Box>
                            <TextField
                                label="comment"
                                variant="outlined"
                                onChange={(e)=>setComment(e.target.value)}
                                style={{ width: '100%', marginBottom: 15 }}
                            />
                            <Button variant="contained" color="primary" style={{ width: '100%', marginBottom: 10 }} onClick={()=>handleCommentSubmit(post._id)}>Add comment</Button>
                            Comments:
                            {
                                (undefined !== post.comments && post.comments.length) ? post.comments.map(comment => {
                                    return <Typography variant="subtitle1" gutterBottom key={comment.comment_id} style={{ background: 'white', borderRadius: 5, padding: 5 }}>{comment.text}</Typography>
                                }) : null
                            }
                        </Box>
                    }) : <Typography variant="h3" gutterBottom>Add some posts to see here...</Typography>
                }
            </Box>
        </Box>
    )
}