const initialState = {};
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCTS_REQUEST':
            return {
                ...state, isGetCommentsRequestLoading: true
            }
        case 'GET_ALL_PRODUCTS_SUCCESS':
            return {
                ...state, isGetCommentsRequestLoading: false, all_comments: action.payload
            }
        case 'GET_ALL_PRODUCTS_FAILURE':
            return {
                ...state, isGetCommentsRequestLoading: false
            }
        case 'CREATE_COMMENT_REQUEST':
            return {
                ...state, isCreateCommentRequestLoading: true
            }
        case 'CREATE_COMMENT_SUCCESS':
            return {
                ...state, isCreateCommentRequestLoading: false, comment_created: action.payload
            }
        case 'CREATE_COMMENT_FAILURE':
            return {
                ...state, isCreateCommentRequestLoading: false
            }
        default:
        return state;
    }
}
export { commentReducer };