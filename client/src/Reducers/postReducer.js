const initialState = {};
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_POSTS_REQUEST':
            return {
                ...state, isGetPostsRequestLoading: true
            }
        case 'GET_ALL_POSTS_SUCCESS':
            return {
                ...state, isGetPostsRequestLoading: false, all_posts: action.payload
            }
        case 'GET_ALL_POSTS_FAILURE':
            return {
                ...state, isGetPostsRequestLoading: false
            }
        case 'ADD_POST_REQUEST':
            return {
                ...state, isAddPostRequestLoading: true
            }
        case 'ADD_POST_SUCCESS':
            return {
                ...state, isAddPostRequestLoading: false, added_post: action.payload
            }
        case 'ADD_POST_FAILURE':
            return {
                ...state, isAddPostRequestLoading: false
            }
        case 'DELETE_POST_REQUEST':
            return {
                ...state, isDeletePostRequestLoading: true
            }
        case 'DELETE_POST_SUCCESS':
            return {
                ...state, isDeletePostRequestLoading: false, post_deleted: action.payload
            }
        case 'DELETE_POST_FAILURE':
            return {
                ...state, isDeletePostRequestLoading: false
            }
        default:
        return state;
    }
}
export { postReducer };