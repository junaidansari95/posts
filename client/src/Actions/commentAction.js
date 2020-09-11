import axios from 'axios';
import { getPosts } from "./postActions";
export const getComments = () => dispatch => {
  dispatch({ type: 'GET_ALL_COMMENTS_REQUEST' })
  axios.get('/api/v1/comments')
    .then(result => {
      dispatch({ type: 'GET_ALL_COMMENTS_SUCCESS', payload: result.data.data })
    })
    .catch(err => {
      dispatch({ type: 'GET_ALL_COMMENTS_FAILURE', payload: err.response.data })
    });
};

export const addComment = (data) => dispatch => {
  dispatch({ type: 'ADD_COMMENT_REQUEST', data })
  axios.post('/api/v1/comments', data)
    .then(result => {
      dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: result.data.data })
      dispatch(getPosts())
    })
    .catch(err => {
      dispatch({ type: 'ADD_COMMENT_FAILURE', payload: err.response.data })
    });
};