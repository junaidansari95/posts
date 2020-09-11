import axios from 'axios';

export const getPosts = () => dispatch => {
  dispatch({ type: 'GET_ALL_POSTS_REQUEST' })
  axios.get('/api/v1/posts')
    .then(result => {
      dispatch({ type: 'GET_ALL_POSTS_SUCCESS', payload: result.data.data })
    })
    .catch(err => {
      dispatch({ type: 'GET_ALL_POSTS_FAILURE', payload: err.response.data })
    });
};

export const addPosts = (data) => dispatch => {
  dispatch({ type: 'ADD_POST_REQUEST', payload: data })
  axios.post('/api/v1/posts',data)
    .then(result => {
      dispatch({ type: 'ADD_POST_SUCCESS', payload: result.data.data })
      dispatch(getPosts())
    })
    .catch(err => {
      dispatch({ type: 'ADD_POST_FAILURE', payload: err.response.data })
    });
};

export const deletePost = (id) => dispatch => {
  dispatch({ type: 'DELETE_POST_REQUEST', payload: id })
  axios.delete(`/api/v1/posts${id}`)
    .then(result => {
      dispatch({ type: 'DELETE_POST_SUCCESS', payload: result.data.success })
    })
    .catch(err => {
      dispatch({ type: 'DELETE_POST_FAILURE', payload: err.response.data })
    });
};
export const updatePost = (data) => dispatch => {
  dispatch({ type: 'UPDATE_POST_REQUEST', payload: data })
  axios.delete(`/api/v1/posts${data.id}`)
    .then(result => {
      dispatch({ type: 'UPDATE_POST_SUCCESS', payload: result.data.success })
    })
    .catch(err => {
      dispatch({ type: 'UPDATE_POST_FAILURE', payload: err.response.data })
    });
};